const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, verifyArtisan } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const uploadAvatar = require('../config/multer-avatar');

// ═══════════════════════════════════════════════════════════════
// GET /api/users/profile - Récupérer le profil de l'utilisateur connecté
// ═══════════════════════════════════════════════════════════════
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;

        const [users] = await db.query(
            'SELECT id, full_name, email, user_type, phone, bio, avatar_url, specialty, location, rating, created_at FROM users WHERE id = ?',
            [user_id]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Utilisateur non trouvé' 
            });
        }

        console.log(`👤 Profil récupéré pour utilisateur ${user_id}`);

        res.json({
            success: true,
            user: users[0]
        });
    } catch (error) {
        console.error('❌ Erreur récupération profil:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération du profil' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/users/:id - Récupérer le profil public d'un utilisateur
// ═══════════════════════════════════════════════════════════════
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [users] = await db.query(
            'SELECT id, full_name, user_type, bio, avatar_url, specialty, location, rating, created_at FROM users WHERE id = ?',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Utilisateur non trouvé' 
            });
        }

        const user = users[0];

        // Si c'est un artisan, récupérer ses produits
        if (user.user_type === 'artisan') {
            const [products] = await db.query(
                'SELECT * FROM products WHERE artisan_id = ? AND is_active = TRUE ORDER BY created_at DESC LIMIT 10',
                [id]
            );
            user.products = products;
            user.totalProducts = products.length;
        }

        console.log(`👀 Profil public consulté pour utilisateur ${id}`);

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('❌ Erreur récupération profil public:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération du profil' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// PUT /api/users/profile - Mettre à jour le profil de l'utilisateur
// ═══════════════════════════════════════════════════════════════
router.put('/profile', verifyToken, uploadAvatar.single('avatar'), async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { full_name, phone, bio, specialty, location } = req.body;

        console.log(`📝 Mise à jour profil utilisateur ${user_id}:`, {
            full_name,
            phone,
            bio,
            specialty,
            location,
            hasAvatar: !!req.file
        });

        const updates = [];
        const values = [];

        if (full_name) {
            updates.push('full_name = ?');
            values.push(full_name);
        }
        if (phone) {
            updates.push('phone = ?');
            values.push(phone);
        }
        if (bio !== undefined) {
            updates.push('bio = ?');
            values.push(bio);
        }
        if (specialty) {
            updates.push('specialty = ?');
            values.push(specialty);
        }
        if (location) {
            updates.push('location = ?');
            values.push(location);
        }
        
        // Si un fichier avatar est uploadé
        if (req.file) {
            const avatar_url = `/uploads/avatars/${req.file.filename}`;
            updates.push('avatar_url = ?');
            values.push(avatar_url);
            console.log(`📸 Avatar uploadé: ${avatar_url}`);
        }

        if (updates.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Aucune donnée à mettre à jour' 
            });
        }

        values.push(user_id);

        console.log('🔧 SQL UPDATE:', `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
        console.log('🔧 Valeurs:', values);

        await db.query(
            `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            values
        );

        // Récupérer le profil mis à jour
        const [users] = await db.query(
            'SELECT id, full_name, email, user_type, phone, bio, avatar_url, specialty, location, rating, created_at FROM users WHERE id = ?',
            [user_id]
        );

        console.log(`✅ Profil mis à jour pour utilisateur ${user_id}`);
        console.log(`📊 Données en BD:`, {
            full_name: users[0]?.full_name,
            phone: users[0]?.phone,
            bio: users[0]?.bio,
            avatar_url: users[0]?.avatar_url,
            specialty: users[0]?.specialty,
            location: users[0]?.location
        });

        res.json({
            success: true,
            message: 'Profil mis à jour avec succès',
            user: users[0]
        });
    } catch (error) {
        console.error('❌ Erreur mise à jour profil:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la mise à jour du profil' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// PUT /api/users/password - Changer le mot de passe
// ═══════════════════════════════════════════════════════════════
router.put('/password', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                success: false, 
                error: 'Mot de passe actuel et nouveau mot de passe requis' 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                success: false, 
                error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' 
            });
        }

        // Vérifier le mot de passe actuel
        const [users] = await db.query('SELECT password_hash FROM users WHERE id = ?', [user_id]);

        if (users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Utilisateur non trouvé' 
            });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                error: 'Mot de passe actuel incorrect' 
            });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe
        await db.query(
            'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [hashedPassword, user_id]
        );

        console.log(`🔒 Mot de passe changé pour utilisateur ${user_id}`);

        res.json({
            success: true,
            message: 'Mot de passe changé avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur changement mot de passe:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors du changement de mot de passe' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/users/artisans - Récupérer la liste des artisans
// ═══════════════════════════════════════════════════════════════
router.get('/artisans/all', async (req, res) => {
    try {
        const { specialty, location } = req.query;

        let query = 'SELECT id, full_name, bio, avatar_url, specialty, location, rating FROM users WHERE user_type = "artisan"';
        const params = [];

        if (specialty) {
            query += ' AND specialty LIKE ?';
            params.push(`%${specialty}%`);
        }

        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        query += ' ORDER BY rating DESC, created_at DESC';

        const [artisans] = await db.query(query, params);

        console.log(`🎨 ${artisans.length} artisans récupérés`);

        res.json({
            success: true,
            artisans
        });
    } catch (error) {
        console.error('❌ Erreur récupération artisans:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération des artisans' 
        });
    }
});

module.exports = router;
