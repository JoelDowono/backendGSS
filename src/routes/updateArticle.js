const { Article } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const authorization = require('../auth/auth')
  
module.exports = (app) => {
  app.put('/api/articles/:id', authorization, (req, res) => {
    const id = req.params.id
    Article.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Article.findByPk(id).then(article => {
        if (article === null) {
          const message = "L'article demandé n\'exite pas. Réessayer avec un autre identifiant."
          return res.status(404).json({ message })
        }
        const message = `L'article ${article.article_name} a bien été modifié.`
        res.json({message, data: article })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "l'article n\'a pas pu être modifier. Réessayez dans quelques instants."
      res.status(500).json({ message, data: error })
    })
  })
}