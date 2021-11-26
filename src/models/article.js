module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define('Article', {
    article_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    article_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    article_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    article_quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    article_picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    article_category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'article_created',
    updatedAt: false
  })
}
