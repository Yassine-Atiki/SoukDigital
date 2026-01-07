const express = require('express');
const router = express.Router();
const db = require('../config/database');
const upload = require('../config/multer');
const { verifyToken, verifyArtisan } = require('../middleware/auth');

// ═══════════════════════════════════════════════════════════════
// GET /api/products - Récupérer tous les produits (avec filtres optionnels)
// ═══════════════════════════════════════════════════════════════
router.get('/', async (req, res) => {
    try {
        const { category, search, artisan_id } = req.query;
        
        let query = `
            SELECT 
                p.*,
                u.full_name as artisan_name,
                u.location as artisan_location,
                u.rating as artisan_rating
            FROM products p
            LEFT JOIN users u ON p.artisan_id = u.id
            WHERE p.is_active = TRUE
        `;
        const params = [];

        // Filtre par catégorie
        if (category && category !== 'Tout') {
            query += ' AND p.category = ?';
            params.push(category);
        }

        // Recherche par nom ou description
        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        // Filtre par artisan
        if (artisan_id) {
            query += ' AND p.artisan_id = ?';
            params.push(artisan_id);
        }

        query += ' ORDER BY p.created_at DESC';

        const [products] = await db.query(query, params);

        console.log(`📦 ${products.length} produits récupérés`);

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('❌ Erreur récupération produits:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération des produits' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// GET /api/products/:id - Récupérer les détails d'un produit
// ═══════════════════════════════════════════════════════════════
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT 
                p.*,
                u.full_name as artisan_name,
                u.location as artisan_location,
                u.rating as artisan_rating,
                u.total_reviews as artisan_reviews
            FROM products p
            LEFT JOIN users u ON p.artisan_id = u.id
            WHERE p.id = ? AND p.is_active = TRUE
        `, [req.params.id]);

        if (products.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Produit non trouvé' 
            });
        }

        // Incrémenter le compteur de vues
        await db.query('UPDATE products SET views = views + 1 WHERE id = ?', [req.params.id]);

        console.log(`👀 Produit ${req.params.id} consulté (vues +1)`);

        res.json({
            success: true,
            product: products[0]
        });
    } catch (error) {
        console.error('❌ Erreur récupération produit:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la récupération du produit' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// POST /api/products - Ajouter un nouveau produit (artisan uniquement)
// Accepte multipart/form-data pour l'upload d'image
// ═══════════════════════════════════════════════════════════════
router.post('/', verifyToken, verifyArtisan, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const artisan_id = req.user.userId;

        console.log('📦 Ajout produit - Données reçues:');
        console.log('   - name:', name);
        console.log('   - category:', category);
        console.log('   - price:', price);
        console.log('   - stock:', stock);
        console.log('   - description:', description?.substring(0, 50) + '...');
        console.log('   - hasFile:', !!req.file);
        
        if (req.file) {
            console.log('   - fileName:', req.file.filename);
            console.log('   - fileSize:', req.file.size, 'bytes');
            console.log('   - mimeType:', req.file.mimetype);
            console.log('   - path:', req.file.path);
        } else {
            console.warn('   ⚠️ AUCUN FICHIER REÇU dans req.file!');
            console.log('   - req.body keys:', Object.keys(req.body));
        }

        // Validation des données
        if (!name || !description || !price || !category) {
            return res.status(400).json({ 
                success: false, 
                error: 'Tous les champs sont requis (nom, description, prix, catégorie)' 
            });
        }

        // Construire l'URL de l'image si un fichier a été uploadé
        let image_url = null;
        if (req.file) {
            // URL accessible depuis le frontend: http://IP:3000/uploads/products/filename.jpg
            image_url = `/uploads/products/${req.file.filename}`;
        }

        const [result] = await db.query(`
            INSERT INTO products (artisan_id, name, description, price, category, image_url, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [artisan_id, name, description, price, category, image_url, stock || 0]);

        // Récupérer le produit créé avec les infos de l'artisan
        const [newProduct] = await db.query(`
            SELECT 
                p.*,
                u.full_name as artisan_name,
                u.location as artisan_location
            FROM products p
            LEFT JOIN users u ON p.artisan_id = u.id
            WHERE p.id = ?
        `, [result.insertId]);

        console.log(`✅ Nouveau produit créé: ${name} par artisan ${artisan_id}`);
        console.log(`🖼️ Image URL: ${image_url || 'Aucune image'}`);

        res.status(201).json({
            success: true,
            product: newProduct[0],
            message: 'Produit ajouté avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur ajout produit:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de l\'ajout du produit' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// PUT /api/products/:id - Modifier un produit (artisan propriétaire uniquement)
// ═══════════════════════════════════════════════════════════════
router.put('/:id', verifyToken, verifyArtisan, async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        const artisan_id = req.user.userId;

        // Vérifier que le produit appartient à cet artisan
        const [products] = await db.query('SELECT artisan_id FROM products WHERE id = ?', [req.params.id]);
        
        if (products.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Produit non trouvé' 
            });
        }

        if (products[0].artisan_id !== artisan_id) {
            return res.status(403).json({ 
                success: false, 
                error: 'Vous n\'êtes pas autorisé à modifier ce produit' 
            });
        }

        await db.query(`
            UPDATE products 
            SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock = ?
            WHERE id = ?
        `, [name, description, price, category, image || null, stock || 0, req.params.id]);

        console.log(`✏️ Produit ${req.params.id} modifié par artisan ${artisan_id}`);

        res.json({
            success: true,
            message: 'Produit modifié avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur modification produit:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la modification du produit' 
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// DELETE /api/products/:id - Supprimer un produit (soft delete)
// ═══════════════════════════════════════════════════════════════
router.delete('/:id', verifyToken, verifyArtisan, async (req, res) => {
    try {
        const artisan_id = req.user.userId;

        // Vérifier que le produit appartient à cet artisan
        const [products] = await db.query('SELECT artisan_id FROM products WHERE id = ?', [req.params.id]);
        
        if (products.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Produit non trouvé' 
            });
        }

        if (products[0].artisan_id !== artisan_id) {
            return res.status(403).json({ 
                success: false, 
                error: 'Vous n\'êtes pas autorisé à supprimer ce produit' 
            });
        }

        // Soft delete (marquer comme inactif au lieu de supprimer)
        await db.query('UPDATE products SET is_active = FALSE WHERE id = ?', [req.params.id]);

        console.log(`🗑️ Produit ${req.params.id} supprimé par artisan ${artisan_id}`);

        res.json({
            success: true,
            message: 'Produit supprimé avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur suppression produit:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erreur serveur lors de la suppression du produit' 
        });
    }
});

module.exports = router;
