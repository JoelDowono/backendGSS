const { Article } = require('../db/sequelize')
const authorization = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/articles/:id', authorization, (req, res) => {
    Article.findByPk(req.params.id).then(article => {
      if (article === null) {
        const message = "L'article demandé n\'exite pas. Réessayer avec un autre identifiant."
        return res.status(404).json({ message })
      }
      const articleDeleted = article;
      return Article.update({article_deleted: true},{
        where: { id: article.id }
      })
      .then(_ => {
        articleDeleted.article_deleted = true;
        const message = `L'article avec l'identifiant n°${articleDeleted.id} a bien été supprimé.`
        res.json({message, data: articleDeleted })
      })
    })
    .catch(error => {
      const message = "l'article n\'a pas pu être supprimé. Réessayez dans quelques instants."
      res.status(500).json({ message, data: error })
    })
  })
}