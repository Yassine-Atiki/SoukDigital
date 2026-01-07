// soukdigital-api/routes/artisans.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/artisans/stats
 * Récupère les statistiques d'un artisan (ventes, commandes, note)
 */
router.get('/stats', verifyToken, async (req, res) => {
    try {
        const artisanId = req.user.id;

        // 1. Calculer le total des ventes (somme de tous les produits vendus)
        const [salesData] = await db.query(`
            SELECT 
                COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_sales,
                COALESCE(COUNT(DISTINCT o.id), 0) as total_orders
            FROM orders o
            INNER JOIN order_items oi ON o.id = oi.order_id
            INNER JOIN products p ON oi.product_id = p.id
            WHERE p.artisan_id = ?
            AND o.status != 'cancelled'
        `, [artisanId]);

        // 2. Récupérer la note moyenne de l'artisan (depuis les produits)
        const [ratingData] = await db.query(`
            SELECT 
                COALESCE(AVG(rating), 0) as avg_rating,
                COALESCE(SUM(total_reviews), 0) as total_reviews
            FROM products
            WHERE artisan_id = ?
        `, [artisanId]);

        // 3. Récupérer le nombre de produits actifs
        const [productsData] = await db.query(`
            SELECT COUNT(*) as active_products
            FROM products
            WHERE artisan_id = ? AND is_active = TRUE
        `, [artisanId]);

        res.json({
            success: true,
            stats: {
                totalSales: parseFloat(salesData[0].total_sales || 0),
                totalOrders: parseInt(salesData[0].total_orders || 0),
                rating: parseFloat(ratingData[0].avg_rating || 0).toFixed(1),
                totalReviews: parseInt(ratingData[0].total_reviews || 0),
                activeProducts: parseInt(productsData[0].active_products || 0)
            }
        });

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des stats artisan:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des statistiques',
            error: error.message
        });
    }
});

/**
 * GET /api/artisans/recent-orders
 * Récupère les commandes récentes d'un artisan
 */
router.get('/recent-orders', verifyToken, async (req, res) => {
    try {
        const artisanId = req.user.id;
        const limit = parseInt(req.query.limit) || 5;

        const [orders] = await db.query(`
            SELECT DISTINCT
                o.id,
                o.order_number,
                o.total_amount,
                o.status,
                o.created_at,
                u.full_name as customer_name,
                u.avatar_url as customer_avatar,
                COUNT(DISTINCT oi.id) as items_count
            FROM orders o
            INNER JOIN order_items oi ON o.id = oi.order_id
            INNER JOIN products p ON oi.product_id = p.id
            INNER JOIN users u ON o.customer_id = u.id
            WHERE p.artisan_id = ?
            GROUP BY o.id, o.order_number, o.total_amount, o.status, o.created_at, u.full_name, u.avatar_url
            ORDER BY o.created_at DESC
            LIMIT ?
        `, [artisanId, limit]);

        res.json({
            success: true,
            orders: orders.map(order => ({
                id: order.id,
                orderNumber: order.order_number,
                customerName: order.customer_name,
                customerAvatar: order.customer_avatar,
                totalAmount: parseFloat(order.total_amount),
                status: order.status,
                itemsCount: parseInt(order.items_count),
                createdAt: order.created_at
            }))
        });

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des commandes:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des commandes',
            error: error.message
        });
    }
});

module.exports = router;
