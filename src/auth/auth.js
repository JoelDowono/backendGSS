//imports
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization //récupération de l'entête http nommée authorization(contient le token à vérifier)
  
  if(!authorizationHeader) { //on verifie que le jeton a bien été fourni si pas on retourne une erreur 401
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1] //récupération du jeton jwt: l'entête d'une requête compote 2 parties d'abord le type et après le token et split permet de découper une chaîne.
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => { //vérifie que le jeton est bien valide.  un callback est une fonction qui va être appelée par une autre fonction
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId // dans userId on rcupère l'id de l'utilisateur qui se trouve dans l'entête 
    if (req.body.userId && req.body.userId !== userId) { // on vérifise premièrement s'il y a un id présent dans la requêtte et ensuite si l'id présent dans la requêtte est différent de celui présent dans le token
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}