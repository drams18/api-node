// app.js
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const productsRoutes = require("./routes/productsRoutes");
const { connectToDatabase } = require("./db/db");

dotenv.config();

// Connexion à la base de données avant de démarrer le serveur Express
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données :', error);
  });
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", productsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});


