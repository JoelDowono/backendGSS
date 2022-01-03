module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('OrderArticle', {
        quantity: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
              isInt: { msg: 'Utiliser uniquement des nombres entier pour la quantité d\'article dans la commande'},
              notNull: { msg: 'la quantité d\'article d\'une commande  est une propriété requise '}
            }
        },
    },{
        timestamps: true,
        createdAt: 'orderArticle_created',
        updatedAt: false
    })
}



