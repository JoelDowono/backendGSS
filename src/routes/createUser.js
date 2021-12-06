const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/users', async (req, res) => {
    req.body.user_password =  await bcrypt.hash(req.body.user_password, 10);
    User.create(req.body)
      .then(user => {
        const message = `L'utilisateur ${req.body.first_name} a bien été crée.`
        res.json({ message, data: user })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = "l'utilisateur n\'a pas pu être ajouter. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}

/*

*/