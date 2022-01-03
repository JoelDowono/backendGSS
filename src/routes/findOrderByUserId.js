const { Order, Article } = require('../db/sequelize')
const {OrderArticle} = require('../db/sequelize');

module.exports = (app) => {

  app.get("/api/orders/:userId", async (req,res)=> {
      //console.log(req)
      const order = await Order.findAll({
        where: {
            userId: req.params.userId
        },
        include: {
          model: Article
        }
      });

      res.json({ message:'test order', data: order })
  })


}