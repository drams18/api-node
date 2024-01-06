// controllers/loginController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../data/users'); // Où vous stockez vos utilisateurs
const secretKey = 'votre_clé_secrète';

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
};
