// ═══════════════════════════════════════════════════════════════
// 🌐 SOUKDIGITAL API SERVER
// Point d'entrée principal pour l'API backend
// ═══════════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

// CORS - Autoriser les requêtes depuis l'application React Native
app.use(cors({
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    credentials: true
}));

// Parser les requêtes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logger pour le développement
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ═══════════════════════════════════════════════════════════════
// ROUTES API
// ═══════════════════════════════════════════════════════════════

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const favoritesRoutes = require('./routes/favorites');
const usersRoutes = require('./routes/users');
const addressesRoutes = require('./routes/addresses');
const artisansRoutes = require('./routes/artisans');

// Enregistrer les routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/addresses', addressesRoutes);
app.use('/api/artisans', artisansRoutes);

// ═══════════════════════════════════════════════════════════════
// ROUTE DE SANTÉ (HEALTH CHECK)
// ═══════════════════════════════════════════════════════════════

app.get('/api/health', async (req, res) => {
    try {
        // Tester la connexion à la base de données
        await db.query('SELECT 1');
        
        res.json({
            success: true,
            message: 'API SoukDigital opérationnelle',
            timestamp: new Date().toISOString(),
            database: 'Connectée ✅',
            version: '1.0.0'
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Service indisponible',
            database: 'Déconnectée ❌',
            error: error.message
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// ROUTE PAR DÉFAUT
// ═══════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
    res.json({
        message: '🎨 Bienvenue sur l\'API SoukDigital',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            orders: '/api/orders',
            favorites: '/api/favorites',
            users: '/api/users',
            addresses: '/api/addresses',
            health: '/api/health'
        }
    });
});

// ═══════════════════════════════════════════════════════════════
// GESTION DES ERREURS 404
// ═══════════════════════════════════════════════════════════════

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route non trouvée',
        path: req.path
    });
});

// ═══════════════════════════════════════════════════════════════
// GESTION DES ERREURS GLOBALES
// ═══════════════════════════════════════════════════════════════

app.use((error, req, res, next) => {
    console.error('❌ Erreur serveur:', error);
    
    res.status(error.status || 500).json({
        success: false,
        error: error.message || 'Erreur interne du serveur',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// ═══════════════════════════════════════════════════════════════
// DÉMARRAGE DU SERVEUR
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, '0.0.0.0', () => {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🎨 SOUKDIGITAL API');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🌐 URL locale: http://localhost:${PORT}`);
    console.log(`📡 URL réseau: http://[VOTRE_IP]:${PORT}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📋 Endpoints disponibles:');
    console.log('   - POST   /api/auth/register');
    console.log('   - POST   /api/auth/login');
    console.log('   - POST   /api/auth/verify');
    console.log('   - GET    /api/products');
    console.log('   - POST   /api/products (Artisan)');
    console.log('   - GET    /api/orders');
    console.log('   - POST   /api/orders');
    console.log('   - GET    /api/favorites');
    console.log('   - POST   /api/favorites/toggle');
    console.log('   - GET    /api/users/profile');
    console.log('   - GET    /api/addresses');
    console.log('   - GET    /api/health (Health check)');
    console.log('═══════════════════════════════════════════════════════════\n');
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', async () => {
    console.log('\n👋 Arrêt du serveur...');
    await db.end();
    process.exit(0);
});

module.exports = app;
