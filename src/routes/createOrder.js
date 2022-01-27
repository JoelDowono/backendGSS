const { Order } = require('../db/sequelize')
const {OrderArticle, Article} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
  app.post('/api/orders', (req, res) => {
    const orderPackage = req.body; //recupérer le corps de la requête 
    const  order = orderPackage.order; //recupère la commande qui est dans le corps de la requête
    order.userId = orderPackage.id_user; //on met l'id de l'utilisateur dans la commande pour savoir à quel utilisateur appartient une commande 
    order.order_status = "CREATED";
    Order.create(order)
      .then( async savedOrder => {
        let articlesOrderToCreate = []; //tableau qui permettra de stocker les informations de table intermediaire entre article et commande 
        for(let article of orderPackage.articles) { //parcourir la liste des articles de la commande 
          let existingArticle = await Article.findByPk(article.id) 
          existingArticle.article_quantity -= article.quantity; //mise à jour de la quantité pour l'article car il y a achat 
          await existingArticle.save(); //sauvegarde de la quantité modifier 
          articlesOrderToCreate.push({OrderId: savedOrder.id, ArticleId: article.id, quantity: article.quantity}) // ajout des informations de la table intermediaire dans le tableau 
        }
        await OrderArticle.bulkCreate(articlesOrderToCreate) //on applique les modifications 
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