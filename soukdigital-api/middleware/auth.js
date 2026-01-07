const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le token JWT
 */
const verifyToken = (req, res, next) => {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Accès non autorisé. Token manquant.' 
        });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajouter les infos utilisateur à la requête
        next();
    } catch (error) {
        console.error('Erreur vérification token:', error.message);
        return res.status(401).json({ 
            success: false, 
            error: 'Token invalide ou expiré' 
        });
    }
};

/**
 * Middleware pour vérifier que l'utilisateur est un artisan
 */
const verifyArtisan = (req, res, next) => {
    if (req.user.userType !== 'artisan') {
        return res.status(403).json({ 
            success: false, 
            error: 'Accès réservé aux artisans uniquement' 
        });
    }
    next();
};

/**
 * Middleware pour vérifier que l'utilisateur est un client
 */
const verifyCustomer = (req, res, next) => {
    if (req.user.userType !== 'customer') {
        return res.status(403).json({ 
            success: false, 
            error: 'Accès réservé aux clients uniquement' 
        });
    }
    next();
};

module.exports = { 
    verifyToken, 
    verifyArtisan, 
    verifyCustomer 
};
