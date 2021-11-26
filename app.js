//imports
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { Sequelize, DataTypes } = require('sequelize')
const { success, getUniqueId } = require('./helper')
let articles = require('./articles')
const ArticleModel = require('./src/models/article')
  
const app = express()
const port = 3000

//instance de la classe sequelize
const sequelize = new Sequelize(
    'global',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            timezone: 'Z'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('la connexion à la base de données à bien été établies'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

const Article = ArticleModel(sequelize, DataTypes)

sequelize.sync({force: true})
    .then(_ => console.log('la base de données "global" a bien été synchronisée'))

//middleware sur mesure
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
  
app.get('/', (req, res) => res.send('Hello, Express 2 !'))

//récupération d'un article 
app.get('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const article = articles.find(article => article.id === id)
    const message = 'un article a bien été trouvé.'
    res.json(success(message, article))
})

// afficharge tous les articles au format json  
app.get('/api/articles', (req, res) => {
    const message = 'la liste des articles a bien été récupérée.'
    res.json(success(message, articles))
})

//création d'un nouvel article 
app.post('/api/articles', (req, res) => {
    const id = getUniqueId(articles)
    const articleCreated = { ...req.body, ...{id: id, article_created: new Date()}}
    articles.push(articleCreated)
    const message = `L'article ${articleCreated.article_name} a bien été crée.`
    res.json(success(message, articleCreated))
})

//modification d'un article
app.put('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const articleUpdated = { ...req.body, id: id }
    articles = articles.map(article => {
     return article.id === id ? articleUpdated : article
    })
     
    const message = `L'article ${articleUpdated.article_name} a bien été modifié.`
    res.json(success(message, articleUpdated))
})

//suppression d'un article 
app.delete('/api/articles/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const articleDeleted = articles.find(article => article.id === id)
    articles = articles.filter(article => article.id !== id)
    const message = `Le pokémon ${articleDeleted.article_name} a bien été supprimé.`
    res.json(success(message, articleDeleted))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))