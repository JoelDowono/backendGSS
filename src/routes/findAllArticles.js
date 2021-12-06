const { Article } = require('../db/sequelize')
const { Op } = require('sequelize')



module.exports = (app) => {
  app.get('/api/articles', (req, res) => {
    if (req.query.article_name) {
      const name = req.query.article_name

      if (name.length < 2) {
        const message = `Le terme de la recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }

      return Article.findAndCountAll({ 
        where: { 
          article_name: {
            [Op.like]: `%${name}%`
          }
        },
        order: ['article_name'],
        limit: 8
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} article(s) qui correspond(ent) au terme de recherche ${name}`
        res.json({ message, data: rows})
      })
    }
    else {
      Article.findAndCountAll({ order: ['article_name'], limit: 6 })
        .then(({ count, rows}) => {
          const message = 'La liste des articles a bien été récupérée.' 
          res.json({ message, data: rows, count })
        })
        .catch(error => {
          const message = `La liste des articles n'a pas pu être récupérée. Réesseyer dans quelques instants.`
          res.status(500).json({ message, data: error })
      })
    }
  })
}