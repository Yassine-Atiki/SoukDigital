const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════
// GET /api/addresses - Récupérer toutes les adresses de l'utilisateur
// ═══════════════════════════════════════════════════════════════
router.get('/', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;

        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
            [user_id]
        );

        console.log(`📍 ${addresses.length} adresses récupérées pour utilisateur ${user_id}`);

        res.json({
            success: true,
            addresses
        });
    } catch (error) {
        console.error('❌ Erreur récupération adresses:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération des adresses' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// POST /api/addresses - Ajouter une nouvelle adresse
// ═══════════════════════════════════════════════════════════════
router.post('/', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { 
            address_line, 
            city, 
            postal_code, 
            country, 
            phone, 
            is_default 
        } = req.body;

        if (!address_line || !city || !country || !phone) {
            return res.status(400).json({ 
                success: false, 
                error: 'Tous les champs sont requis (address_line, city, country, phone)' 
            });
        }

        // Si cette adresse est marquée par défaut, retirer le flag des autres
        if (is_default) {
            await db.query(
                'UPDATE addresses SET is_default = FALSE WHERE user_id = ?',
                [user_id]
            );
        }

        const [result] = await db.query(
            `INSERT INTO addresses (user_id, address_line, city, postal_code, country, phone, is_default) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, address_line, city, postal_code || null, country, phone, is_default || false]
        );

        // Récupérer l'adresse créée
        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE id = ?',
            [result.insertId]
        );

        console.log(`✅ Adresse ${result.insertId} créée pour utilisateur ${user_id}`);

        res.status(201).json({
            success: true,
            message: 'Adresse ajoutée avec succès',
            address: addresses[0]
        });
    } catch (error) {
        console.error('❌ Erreur création adresse:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la création de l\'adresse' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// PUT /api/addresses/:id - Mettre à jour une adresse
// ═══════════════════════════════════════════════════════════════
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;
        const { 
            address_line, 
            city, 
            postal_code, 
            country, 
            phone, 
            is_default 
        } = req.body;

        // Vérifier que l'adresse appartient à l'utilisateur
        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
            [id, user_id]
        );

        if (addresses.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Adresse non trouvée ou accès non autorisé' 
            });
        }

        // Si cette adresse est marquée par défaut, retirer le flag des autres
        if (is_default) {
            await db.query(
                'UPDATE addresses SET is_default = FALSE WHERE user_id = ? AND id != ?',
                [user_id, id]
            );
        }

        const updates = [];
        const values = [];

        if (address_line) {
            updates.push('address_line = ?');
            values.push(address_line);
        }
        if (city) {
            updates.push('city = ?');
            values.push(city);
        }
        if (postal_code !== undefined) {
            updates.push('postal_code = ?');
            values.push(postal_code);
        }
        if (country) {
            updates.push('country = ?');
            values.push(country);
        }
        if (phone) {
            updates.push('phone = ?');
            values.push(phone);
        }
        if (is_default !== undefined) {
            updates.push('is_default = ?');
            values.push(is_default);
        }

        if (updates.length === 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'Aucune donnée à mettre à jour' 
            });
        }

        values.push(id);

        await db.query(
            `UPDATE addresses SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            values
        );

        // Récupérer l'adresse mise à jour
        const [updatedAddresses] = await db.query(
            'SELECT * FROM addresses WHERE id = ?',
            [id]
        );

        console.log(`✅ Adresse ${id} mise à jour pour utilisateur ${user_id}`);

        res.json({
            success: true,
            message: 'Adresse mise à jour avec succès',
            address: updatedAddresses[0]
        });
    } catch (error) {
        console.error('❌ Erreur mise à jour adresse:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la mise à jour de l\'adresse' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// DELETE /api/addresses/:id - Supprimer une adresse
// ═══════════════════════════════════════════════════════════════
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        // Vérifier que l'adresse appartient à l'utilisateur
        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
            [id, user_id]
        );

        if (addresses.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Adresse non trouvée ou accès non autorisé' 
            });
        }

        await db.query('DELETE FROM addresses WHERE id = ?', [id]);

        console.log(`🗑️ Adresse ${id} supprimée pour utilisateur ${user_id}`);

        res.json({
            success: true,
            message: 'Adresse supprimée avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur suppression adresse:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la suppression de l\'adresse' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// PUT /api/addresses/:id/default - Définir une adresse par défaut
// ═══════════════════════════════════════════════════════════════
router.put('/:id/default', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;

        // Vérifier que l'adresse appartient à l'utilisateur
        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
            [id, user_id]
        );

        if (addresses.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Adresse non trouvée ou accès non autorisé' 
            });
        }

        // Retirer le flag par défaut de toutes les adresses
        await db.query(
            'UPDATE addresses SET is_default = FALSE WHERE user_id = ?',
            [user_id]
        );

        // Marquer cette adresse comme par défaut
        await db.query(
            'UPDATE addresses SET is_default = TRUE WHERE id = ?',
            [id]
        );

        console.log(`⭐ Adresse ${id} définie par défaut pour utilisateur ${user_id}`);

        res.json({
            success: true,
            message: 'Adresse définie par défaut avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur définition adresse par défaut:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la définition de l\'adresse par défaut' 
        });
    }
});

module.exports = router;
