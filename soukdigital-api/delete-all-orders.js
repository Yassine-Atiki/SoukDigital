// Script pour supprimer toutes les commandes de test
const mysql = require('mysql2/promise');
require('dotenv').config();

async function deleteAllOrders() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'soukdigital'
    });

    try {
        console.log('🗑️  Suppression de toutes les commandes...\n');

        // 1. Compter les commandes avant suppression
        const [ordersCount] = await connection.query('SELECT COUNT(*) as count FROM orders');
        const [itemsCount] = await connection.query('SELECT COUNT(*) as count FROM order_items');

        console.log(`📊 Avant suppression:`);
        console.log(`   - ${ordersCount[0].count} commandes`);
        console.log(`   - ${itemsCount[0].count} articles de commande\n`);

        if (ordersCount[0].count === 0) {
            console.log('ℹ️  Aucune commande à supprimer.\n');
            return;
        }

        // 2. Supprimer les articles de commande d'abord (contrainte de clé étrangère)
        await connection.query('DELETE FROM order_items');
        console.log('✅ Articles de commande supprimés');

        // 3. Supprimer les commandes
        await connection.query('DELETE FROM orders');
        console.log('✅ Commandes supprimées');

        // 4. Réinitialiser les auto-increment (optionnel)
        await connection.query('ALTER TABLE order_items AUTO_INCREMENT = 1');
        await connection.query('ALTER TABLE orders AUTO_INCREMENT = 1');
        console.log('✅ Compteurs réinitialisés\n');

        console.log('🎉 Toutes les commandes ont été supprimées avec succès !');
        console.log('📱 Vous pouvez maintenant tester de nouvelles commandes.\n');

    } catch (error) {
        console.error('❌ Erreur:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await connection.end();
    }
}

deleteAllOrders();
