const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════
// GET /api/favorites - Récupérer tous les favoris de l'utilisateur
// ═══════════════════════════════════════════════════════════════
router.get('/', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;

        const [favorites] = await db.query(`
            SELECT 
                f.id as favorite_id,
                p.*,
                u.full_name as artisan_name,
                u.location as artisan_location
            FROM favorites f
            INNER JOIN products p ON f.product_id = p.id
            LEFT JOIN users u ON p.artisan_id = u.id
            WHERE f.user_id = ? AND p.is_active = TRUE
            ORDER BY f.created_at DESC
        `, [user_id]);

        console.log(`❤️ ${favorites.length} favoris récupérés pour utilisateur ${user_id}`);

        res.json({
            success: true,
            favorites
        });
    } catch (error) {
        console.error('❌ Erreur récupération favoris:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération des favoris' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// POST /api/favorites/toggle - Ajouter/Retirer un produit des favoris
// ═══════════════════════════════════════════════════════════════
router.post('/toggle', verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const user_id = req.user.userId;

        if (!productId) {
            return res.status(400).json({ 
                success: false, 
                error: 'ID du produit requis' 
            });
        }

        // Vérifier si le produit est déjà dans les favoris
        const [existing] = await db.query(
            'SELECT id FROM favorites WHERE user_id = ? AND product_id = ?',
            [user_id, productId]
        );

        if (existing.length > 0) {
            // Retirer des favoris
            await db.query('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [user_id, productId]);
            
            // Décrémenter les likes du produit
            await db.query('UPDATE products SET likes = GREATEST(likes - 1, 0) WHERE id = ?', [productId]);

            console.log(`💔 Produit ${productId} retiré des favoris de l'utilisateur ${user_id}`);

            res.json({
                success: true,
                action: 'removed',
                message: 'Produit retiré des favoris'
            });
        } else {
            // Ajouter aux favoris
            await db.query(
                'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
                [user_id, productId]
            );

            // Incrémenter les likes du produit
            await db.query('UPDATE products SET likes = likes + 1 WHERE id = ?', [productId]);

            console.log(`❤️ Produit ${productId} ajouté aux favoris de l'utilisateur ${user_id}`);

            res.json({
                success: true,
                action: 'added',
                message: 'Produit ajouté aux favoris'
            });
        }
    } catch (error) {
        console.error('❌ Erreur toggle favori:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la modification des favoris' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/favorites/check/:productId - Vérifier si un produit est favori
// ═══════════════════════════════════════════════════════════════
router.get('/check/:productId', verifyToken, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { productId } = req.params;

        const [favorites] = await db.query(
            'SELECT id FROM favorites WHERE user_id = ? AND product_id = ?',
            [user_id, productId]
        );

        res.json({
            success: true,
            isFavorite: favorites.length > 0
        });
    } catch (error) {
        console.error('❌ Erreur vérification favori:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la vérification' 
        });
    }
});

module.exports = router;
