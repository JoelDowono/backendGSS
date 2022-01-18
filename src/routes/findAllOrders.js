const { Order, Article } = require('../db/sequelize')

module.exports = (app) => {

  app.get("/api/orders", async (req,res)=> {
      //console.log(req)
      const orders = await Order.findAll({
        include: {
          model: Article
        }
      });

      res.json({ message:'test order', data: orders })
  })


}