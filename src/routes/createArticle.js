const { Article } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const authorization = require('../auth/auth')
  
module.exports = (app) => {
  app.post('/api/articles', authorization, (req, res) => { //avant de créer l'article on exécute le midleware pour s'assurer que l'utilisateur possède un token et que celui-ci est bien valide 
    Article.create(req.body)
      .then(article => {
        const message = `L'article ${req.body.article_name} a bien été crée.`
        res.json({ message, data: article })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = "l'article n\'a pas pu être ajouter. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}