const { Order } = require('../db/sequelize')
const {OrderArticle, Article} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const article = require('../models/article')

/*
{
  order: {notre commande}
  articles: [
    {
      id: number,
      quantity: number
    }
  ],
  id_user: number
}
 */
module.exports = (app) => {
  app.post('/api/orders', (req, res) => {
    const orderPackage = req.body;
    const  order = orderPackage.order;
    order.userId = orderPackage.id_user;
    order.order_status = "CREATED";
    Order.create(order)
      .then( async savedOrder => {
        let articlesOrderToCreate = [];
        let articlesToUpdate = [];
        for(let article of orderPackage.articles) {
          let existingArticle = await Article.findByPk(article.id)
          existingArticle.article_quantity -= article.quantity;
          await existingArticle.save();
          articlesOrderToCreate.push({OrderId: savedOrder.id, ArticleId: article.id, quantity: article.quantity})
        }
        await OrderArticle.bulkCreate(articlesOrderToCreate)
        const message = `La commande a bien été crée.`
        res.json({ message, data: savedOrder  })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = "La commande n\'a pas pu être ajouter. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  });


}