// Script pour vérifier les produits dans la base de données
const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkProducts() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'soukdigital'
    });

    try {
        console.log('🔍 Vérification des produits...\n');

        const [products] = await connection.query(`
            SELECT id, name, artisan_id, image_url, created_at
            FROM products
            ORDER BY created_at DESC
            LIMIT 10
        `);

        console.log(`📦 ${products.length} produits trouvés:\n`);
        
        products.forEach(p => {
            console.log(`ID: ${p.id}`);
            console.log(`Nom: ${p.name}`);
            console.log(`Artisan ID: ${p.artisan_id}`);
            console.log(`Image URL: ${p.image_url || '❌ NULL'}`);
            console.log(`Créé le: ${p.created_at}`);
            console.log('---');
        });

    } catch (error) {
        console.error('❌ Erreur:', error.message);
    } finally {
        await connection.end();
    }
}

checkProducts();
