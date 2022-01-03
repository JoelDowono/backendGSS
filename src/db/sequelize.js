const { Sequelize, DataTypes } = require('sequelize')
const ArticleModel = require('../models/article')
const UserModel = require('../models/user')
const articles = require('./articles')
const bcrypt = require('bcrypt')
const RoleModel = require('../models/role')
const OrderModel = require('../models/order')
const OrderArticleModel = require('../models/orderArticle')
  
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
const Role = RoleModel(sequelize, DataTypes)
const Order = OrderModel(sequelize, DataTypes)
const OrderArticle = OrderArticleModel(sequelize, DataTypes)

Role.hasMany(User, { foreignKey: 'roleId' })
User.hasMany(Order, { foreignKey: 'userId'})

Order.belongsToMany(Article, { through: OrderArticle})
Article.belongsToMany(Order, { through: OrderArticle})
OrderArticle.belongsTo(Order)
OrderArticle.belongsTo(Article)
Order.hasMany(OrderArticle)
Article.hasMany(OrderArticle)

const initDb = () => {
  return sequelize.sync({force: false}).then(async () => {
   /* articles.map(article => {
      Article.create({
        article_name: article.article_name,
        article_description: article.article_description,
        article_price: article.article_price,
        article_quantity: article.article_quantity,
        article_picture: article.article_picture,
        article_category: article.article_category,
      })
    })

    //création des roles
    const superAdminRole = await Role.create({
      role_name: 'SUPERADMIN'
    })

    const adminRole = await Role.create({
      role_name: 'ADMIN'
    })

    const clientRole = await Role.create({
      role_name: 'CLIENT'
    })

    bcrypt.hash('Tototiti123', 10)
    .then(hash => {
      User.create({
        first_name: 'Joel',
        last_name: 'Dowono',
        user_mail: 'joeldowono1@gmail.com',
        user_password: hash,
        roleId: superAdminRole.id
      })
    })

    bcrypt.hash('Tototiti1', 10)
    .then(hash => {
      User.create({
        first_name: 'Junior',
        last_name: 'Tcheuk',
        user_mail: 'juniortcheuk@gmail.com',
        user_password: hash,
        roleId: adminRole.id
      })
    })

    bcrypt.hash('Tototiti12345', 10)
    .then(hash => {
      User.create({
        first_name: 'Tamo',
        last_name: 'Rita',
        user_mail: 'tamorita@gmail.com',
        user_password: hash,
        roleId: clientRole.id
      })
    })*/

    console.log('La base de donnée a bien été initialisée !')
  }).catch(error => {
    console.log(error)
  })
}
  
module.exports = { 
  initDb, Article, User, Order, OrderArticle
}