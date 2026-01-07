// Script pour insérer des données de test pour le dashboard artisan
const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedArtisanData() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'soukdigital'
    });

    try {
        console.log('🌱 Insertion des données de test pour artisan...\n');

        // 1. Récupérer l'ID de l'artisan (utilisateur avec email artisansoukdigital@gmail.com)
        const [artisans] = await connection.query(
            'SELECT id, full_name FROM users WHERE email = ? AND user_type = ?',
            ['artisansoukdigital@gmail.com', 'artisan']
        );

        if (artisans.length === 0) {
            console.log('❌ Aucun artisan trouvé avec l\'email artisansoukdigital@gmail.com');
            return;
        }

        const artisanId = artisans[0].id;
        const artisanName = artisans[0].full_name;
        console.log(`✅ Artisan trouvé: ${artisanName} (ID: ${artisanId})\n`);

        // 2. Récupérer un client pour les commandes
        const [clients] = await connection.query(
            'SELECT id, full_name FROM users WHERE user_type = ? LIMIT 1',
            ['customer']
        );

        if (clients.length === 0) {
            console.log('❌ Aucun client trouvé');
            return;
        }

        const clientId = clients[0].id;
        const clientName = clients[0].full_name;
        console.log(`✅ Client trouvé: ${clientName} (ID: ${clientId})\n`);

        // 3. Récupérer les produits de l'artisan
        const [products] = await connection.query(
            'SELECT id, name, price FROM products WHERE artisan_id = ? LIMIT 3',
            [artisanId]
        );

        if (products.length === 0) {
            console.log(`❌ Aucun produit trouvé pour l'artisan ${artisanName}`);
            console.log('   Ajoutez d\'abord des produits via l\'app mobile.');
            return;
        }

        console.log(`✅ ${products.length} produits trouvés:\n`);
        products.forEach(p => console.log(`   - ${p.name} (${p.price} MAD)`));
        console.log('');

        // 4. Créer des commandes de test
        const orderData = [
            { status: 'processing', items: [products[0], products[1]], date: new Date() },
            { status: 'in_transit', items: [products[0]], date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { status: 'delivered', items: [products[1], products[2] || products[0]], date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        ];

        for (let i = 0; i < orderData.length; i++) {
            const order = orderData[i];
            const orderNumber = `CMD-${Date.now()}-${i}`;
            const totalAmount = order.items.reduce((sum, item) => sum + parseFloat(item.price), 0);

            // Insérer la commande
            const [result] = await connection.query(`
                INSERT INTO orders (
                    order_number, customer_id, total_amount, shipping_cost, status, 
                    payment_method, delivery_address, delivery_city, delivery_phone, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                orderNumber,
                clientId,
                totalAmount,
                50.00,
                order.status,
                'carte',
                '123 Rue Mohammed V',
                'Casablanca',
                '0612345678',
                order.date
            ]);

            const orderId = result.insertId;

            // Insérer les items de la commande
            for (const item of order.items) {
                const subtotal = parseFloat(item.price) * 1;
                await connection.query(`
                    INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [orderId, item.id, item.name, 1, item.price, subtotal]);
            }

            console.log(`✅ Commande créée: ${orderNumber} (${order.status}) - ${totalAmount} MAD`);
        }

        console.log('\n✅ Données de test insérées avec succès!');
        console.log('\n📊 Résumé:');
        console.log(`   - 3 commandes créées pour ${artisanName}`);
        console.log(`   - Client: ${clientName}`);
        console.log(`   - Produits utilisés: ${products.length}`);

    } catch (error) {
        console.error('❌ Erreur:', error.message);
    } finally {
        await connection.end();
    }
}

seedArtisanData();
