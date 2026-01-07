const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════
// POST /api/orders - Créer une nouvelle commande
// ═══════════════════════════════════════════════════════════════
router.post('/', verifyToken, async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
        const customer_id = req.user.userId;

        // Générer un numéro de commande unique
        const orderNumber = 'CMD' + Date.now().toString().slice(-6);

        // Créer la commande
        const [orderResult] = await connection.query(`
            INSERT INTO orders (
                order_number, customer_id, total_amount, shipping_cost, 
                payment_method, delivery_address, delivery_city, delivery_postal_code, delivery_phone
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            orderNumber,
            customer_id,
            totalAmount,
            50.00, // Frais de livraison fixes
            paymentMethod,
            shippingAddress.address,
            shippingAddress.city,
            shippingAddress.postalCode || '',
            shippingAddress.phone || ''
        ]);

        const orderId = orderResult.insertId;

        // Ajouter les articles de la commande
        for (const item of items) {
            await connection.query(`
                INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                orderId,
                item.id,
                item.name,
                item.quantity,
                item.price,
                item.price * item.quantity
            ]);

            // Décrémenter le stock
            await connection.query(`
                UPDATE products SET stock = stock - ? WHERE id = ?
            `, [item.quantity, item.id]);
        }

        await connection.commit();

        console.log(`✅ Nouvelle commande créée: ${orderNumber} pour client ${customer_id}`);

        res.status(201).json({
            success: true,
            order: {
                id: orderId,
                orderNumber,
                message: 'Commande créée avec succès'
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('❌ Erreur création commande:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la création de la commande' 
        });
    } finally {
        connection.release();
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/orders - Récupérer les commandes de l'utilisateur
// ═══════════════════════════════════════════════════════════════
router.get('/', verifyToken, async (req, res) => {
    try {
        const customer_id = req.user.userId;
        const { status } = req.query;

        let query = `
            SELECT o.*, 
                   (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count
            FROM orders o
            WHERE o.customer_id = ?
        `;
        const params = [customer_id];

        if (status) {
            query += ' AND o.status = ?';
            params.push(status);
        }

        query += ' ORDER BY o.created_at DESC';

        const [orders] = await db.query(query, params);

        console.log(`📦 ${orders.length} commandes récupérées pour client ${customer_id}`);

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('❌ Erreur récupération commandes:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération des commandes' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/orders/:id - Récupérer les détails d'une commande
// ═══════════════════════════════════════════════════════════════
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const customer_id = req.user.userId;

        // Récupérer la commande
        const [orders] = await db.query(`
            SELECT * FROM orders WHERE id = ? AND customer_id = ?
        `, [req.params.id, customer_id]);

        if (orders.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Commande non trouvée' 
            });
        }

        // Récupérer les articles
        const [items] = await db.query(`
            SELECT oi.*, p.image_url 
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [req.params.id]);

        const order = {
            ...orders[0],
            items
        };

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('❌ Erreur récupération commande:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération de la commande' 
        });
    }
});

module.exports = router;
