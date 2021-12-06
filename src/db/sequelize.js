const { Sequelize, DataTypes } = require('sequelize')
const ArticleModel = require('../models/article')
const UserModel = require('../models/user')
const articles = require('./articles')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('global', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false
})
  
const Article = ArticleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
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

    bcrypt.hash('Tototiti123', 10)
    .then(hash => {
      User.create({
        first_name: 'Joel',
        last_name: 'Dowono',
        user_mail: 'joeldowono1@gmail.com',
        user_role: 'administrateur',
        user_password: hash
      })
    })
    bcrypt.hash('Tototiti12345', 10)
    .then(hash => {
      User.create({
        first_name: 'Tamo',
        last_name: 'Rita',
        user_mail: 'tamorita@gmail.com',
        user_role: 'administrateur',
        user_password: hash
      })
    })
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Article, User
}
