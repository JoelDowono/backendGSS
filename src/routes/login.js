const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { user_mail: req.body.user_mail } }).then(user => {
        if (!user) {
            const message = `L'utilisateur demandé n'existe pas`
            return res.status(404).json({ message })
        }
        bcrypt.compare(req.body.user_password, user.user_password).then(isPasswordValid => {
            if(!isPasswordValid) {
                const message = `Le mot de passe est incorrect.`;
                return res.status(401).json({ message })
            }

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user })
        })
    })
    .catch(error =>{
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
        return res.json({ message, data: error })
    })
  })
}