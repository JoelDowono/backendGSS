const { Article } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.post('/api/articles', (req, res) => {
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