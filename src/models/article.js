module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define('Article', {
    article_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        notEmpty: { msg: 'le nom ne peut pas être vide' },
        notNull: { msg: 'Le nom est une propriété requise '}
      }
    },
    article_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'la description ne doit pas être vide' },
        notNull: { msg: 'La description est une propriété requise '}
      }
    },
    article_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'le prix ne peut pas être vide' },
        isFloat: { msg: 'le prix est nombre flottant'},
        notNull: { msg: 'Le prix est une propriété requise '}
      }
    },
    article_quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utiliser uniquement des nombres entier pour la quantité d\'article'},
        notNull: { msg: 'la quantité d\'article est une propriété requise '}
      }
    },
    article_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utiliser uniquement une Url valide pour l\'image.' },
        notNull: { msg: 'L\'image est une propriété requise '}
      }
    },
    article_category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'la catégorie ne doit pas être vide' },
        notNull: { msg: 'La catégorie est une propriété requise '}
      }
    }
  }, {
    timestamps: true,
    createdAt: 'article_created',
    updatedAt: false
  })
}
