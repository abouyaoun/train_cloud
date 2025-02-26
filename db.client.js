const { Sequelize } = require('sequelize');
const { Client } = require('pg');
require('dotenv').config();

// 🎯 Connexion avec Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Utilisé pour certaines configurations cloud (Render)
    },
  },
  logging: false, // Désactive les logs SQL (optionnel)
});

// 🎯 Connexion avec pg (optionnel si besoin de requêtes manuelles)
const client = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Render exige parfois cette option
  }
});

client.connect()
  .then(() => console.log('✅ Connexion PostgreSQL (pg) réussie !'))
  .catch(err => console.error('❌ Erreur de connexion PostgreSQL (pg) :', err));


// 🎯 Vérifier la connexion Sequelize et synchroniser la DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion Sequelize réussie !');

    await sequelize.sync({ force: false }); // Crée les tables si elles n'existent pas
    console.log('✅ Base de données synchronisée avec Sequelize !');
  } catch (error) {
    console.error('❌ Erreur de connexion Sequelize :', error);
  }
})();

module.exports = { sequelize, client };