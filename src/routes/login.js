const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const fetch = require('isomorphic-fetch');

const googleApi = `https://www.google.com/recaptcha/api/siteverify`
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
console.log(req.body);
let url = googleApi + `?secret=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe&response=${req.body.token}`;
    fetch(url, { method: 'post'})
        .then(response => response.json())
        .then(google_response => {
            if(google_response.success) {
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
            
                        //JWT
                        const token = jwt.sign(
                            { userId: user.id },
                            privateKey,
                            { expiresIn: '24h'}
                        )
            
                        const message = `L'utilisateur a été connecté avec succès`;
                        return res.json({ message, data: user, token })
                    })
                })
                .catch(error =>{
                    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
                    return res.status(400).json({ message, data: error })
                })
            } else {
                return res.status(401).json({ message:"Impossible validé que vous êtes bien un humain", data: null })
            }
        })// google_reponse.success
        .catch(error => {
            return res.status(401).json({ message:"Impossible validé que vous êtes bien un humain", data: null })
        });

  
    
  })
}