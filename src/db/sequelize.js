const { Sequelize, DataTypes } = require('sequelize')
const ArticleModel = require('../models/article')
const articles = require('./articles')
  
const sequelize = new Sequelize('global', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false
})
  
const Article = ArticleModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    articles.map(article => {
      Article.create({
        article_name: article.article_name,
        article_description: article.article_description,
        article_price: article.article_price,
        article_quantity: article.article_quantity,
        article_picture: article.article_picture,
        article_category: article.article_category,
      }).then(article => console.log(article.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Article
}