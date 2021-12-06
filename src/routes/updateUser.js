const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return User.findByPk(id).then(user => {
        if (user === null) {
          const message = "L'utilisateur demandé n\'exite pas. Réessayer avec un autre identifiant."
          return res.status(404).json({ message })
        }
        const message = `L'utilisateur ${user.first_name} a bien été modifié.`
        res.json({message, data: user })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "l'utilisateur n\'a pas pu être modifier. Réessayez dans quelques instants."
      res.status(500).json({ message, data: error })
    })
  })
}