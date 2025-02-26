const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db.client'); // Assure que sequelize est bien importé

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Utilisation correcte de l'instance Sequelize
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` si non nécessaires
  }
);

module.exports = Article;
