// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const db = require('../db/db')


router.get('/products', productController.getAllProducts); //bon ; accessible à l'admin
router.get('/products/:id', productController.getProductById); //bon ; accessible à tous

//endpoint
router.post('/products', (req, res) => {
    // Récupérer les données du corps de la requête
    const { name, description } = req.body;
  
    // Exécuter la requête SQL pour insérer le nouveau produit dans la base de données
    const sql = 'INSERT INTO products (name, description) VALUES ("ronaldo","suuu")';
    db.query(sql, [name, description], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création du produit : ' + err.message);
        res.status(500).json({ error: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Produit créé avec succès', productId: result.insertId });
      }
    });
}); //bon ; accessible à tous

  
router.put('/products/:id', productController.updateProduct); //bon ; accessible à tous
router.delete('/products/:id', productController.deleteProduct); //bon ; accessible à tous

module.exports = router;
