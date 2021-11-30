const { Article } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/articles/:id', (req, res) => {
    Article.findByPk(req.params.id)
      .then(article => {
        if (article === null) {
          const message = "L'article demandé n\'exite pas. Réessayer avec un autre identifiant."
          return res.status(404).json({ message })
        }
        const message = 'Un article a bien été trouvé.'
        res.json({ message, data: article })
      })
      .catch(error => {
        const message = "l'article n'a pas pu être récupérer. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}