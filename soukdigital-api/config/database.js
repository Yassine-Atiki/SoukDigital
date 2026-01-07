const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la connexion MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de connexion au démarrage
pool.getConnection()
    .then(connection => {
        console.log('✅ Connexion MySQL réussie!');
        console.log(`📊 Base de données: ${process.env.DB_NAME}`);
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erreur de connexion MySQL:', err.message);
        console.error('Vérifiez vos paramètres dans le fichier .env');
        process.exit(1);
    });

module.exports = pool;
