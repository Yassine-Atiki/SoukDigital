const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// ═══════════════════════════════════════════════════════════════
// POST /api/auth/register - Inscription d'un nouvel utilisateur
// ═══════════════════════════════════════════════════════════════
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, userType } = req.body;

        // Validation des données
        if (!fullName || !email || !password || !userType) {
            return res.status(400).json({ 
                success: false, 
                error: 'Tous les champs sont requis' 
            });
        }

        // Vérifier si l'email existe déjà
        const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Cet email est déjà utilisé' 
            });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const [result] = await db.query(
            'INSERT INTO users (full_name, email, password_hash, user_type) VALUES (?, ?, ?, ?)',
            [fullName, email, hashedPassword, userType]
        );

        // Récupérer l'utilisateur créé
        const [users] = await db.query(
            'SELECT id, full_name, email, user_type, phone, bio, avatar_url, specialty, location, rating FROM users WHERE id = ?',
            [result.insertId]
        );

        const user = users[0];

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user.id, userType: user.user_type },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        console.log(`✅ Nouvel utilisateur créé: ${user.email} (${user.user_type})`);

        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                userType: user.user_type,
                phone: user.phone,
                bio: user.bio,
                avatar: user.avatar_url,
                specialty: user.specialty,
                location: user.location,
                rating: user.rating
            },
            token
        });
    } catch (error) {
        console.error('❌ Erreur inscription:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de l\'inscription' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// POST /api/auth/login - Connexion d'un utilisateur
// ═══════════════════════════════════════════════════════════════
router.post('/login', async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        console.log(`🔐 Tentative de connexion:`, { email, userType, hasPassword: !!password });

        // Validation des données
        if (!email || !password || !userType) {
            console.log('❌ Validation échouée - Champs manquants');
            return res.status(400).json({ 
                success: false, 
                error: 'Email, mot de passe et type d\'utilisateur requis' 
            });
        }

        // Trouver l'utilisateur
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ? AND user_type = ? AND is_active = TRUE',
            [email, userType]
        );

        console.log(`🔍 Recherche utilisateur: ${email} (${userType}) - Trouvé: ${users.length}`);

        if (users.length === 0) {
            console.log('❌ Utilisateur non trouvé ou type incorrect');
            return res.status(401).json({ 
                success: false, 
                error: 'Email ou mot de passe incorrect' 
            });
        }

        const user = users[0];

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        console.log(`🔑 Vérification mot de passe: ${isValidPassword ? 'VALIDE ✅' : 'INVALIDE ❌'}`);

        if (!isValidPassword) {
            console.log('❌ Mot de passe incorrect');
            return res.status(401).json({ 
                success: false, 
                error: 'Email ou mot de passe incorrect' 
            });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user.id, userType: user.user_type },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        console.log(`✅ Connexion réussie: ${user.email} (${user.user_type})`);

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                userType: user.user_type,
                phone: user.phone,
                bio: user.bio,
                avatar: user.avatar_url,
                specialty: user.specialty,
                location: user.location,
                rating: user.rating
            },
            token
        });
    } catch (error) {
        console.error('❌ Erreur connexion:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la connexion' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// POST /api/auth/verify - Vérifier si le token est valide
// ═══════════════════════════════════════════════════════════════
router.post('/verify', async (req, res) => {
    try {
        // Récupérer le token depuis le header Authorization
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : req.body.token; // Fallback sur body.token pour compatibilité

        if (!token) {
            return res.status(400).json({ 
                success: false, 
                error: 'Token requis' 
            });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur
        const [users] = await db.query(
            'SELECT id, full_name, email, user_type, phone, bio, avatar_url, specialty, location, rating FROM users WHERE id = ? AND is_active = TRUE',
            [decoded.userId]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                error: 'Utilisateur non trouvé' 
            });
        }

        const user = users[0];

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                userType: user.user_type,
                phone: user.phone,
                bio: user.bio,
                avatar: user.avatar_url,
                specialty: user.specialty,
                location: user.location,
                rating: user.rating
            }
        });
    } catch (error) {
        console.error('❌ Erreur vérification token:', error);
        res.status(401).json({ 
            success: false, 
            error: 'Token invalide ou expiré' 
        });
    }
});

module.exports = router;
