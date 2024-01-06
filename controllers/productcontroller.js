// controllers/productController.js
const pool = require('../db/db');

exports.getAllProducts = (req, res) => {
    console.log('Fetching all products...');

    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        }
        console.log('Products fetched successfully:', results);
        res.json(results);
    });
};


exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    pool.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.json(results[0]);
    });
};

exports.createProduct = (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Permission refusée' });
    }

    const { name, description } = req.body;
    pool.query('INSERT INTO products (name, description) VALUES (?, ?)', [name, description], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la création du produit' });
        }

        const newProduct = { id: results.insertId, name, description };
        res.status(201).json(newProduct);
    });
};

exports.updateProduct = (req, res) => {
    // if (req.user.role !== 'ADMIN') {
    //     return res.status(403).json({ message: 'Permission refusée' });
    // }

    const productId = parseInt(req.params.id);
    const { name, description } = req.body;
    
    pool.query('UPDATE products SET name = ?, description = ? WHERE id = ?', [name, description, productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.json({ id: productId, name, description });
    });
};

exports.deleteProduct = (req, res) => {
    // if (req.user.role !== 'ADMIN') {
    //     return res.status(403).json({ message: 'Permission refusée' });
    // }

    const productId = parseInt(req.params.id);

    pool.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.json({ id: productId });
    });
};