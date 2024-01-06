# Utiliser une image de base Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Nettoyer le cache npm
RUN npm cache clean --force

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers dans le conteneur
COPY . .

# Exposer le port sur lequel l'API écoute
EXPOSE 3000

# Commande pour démarrer l'API en utilisant le script "start"
CMD ["npm", "start"]
