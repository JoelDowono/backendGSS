module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
        order_adress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: { msg: 'l\'adresse de l\'ivraison ne doit pas être vide' },
              notNull: { msg: 'l\'adresse de l\'ivraison est une propriété requise '}
            }
        },
        order_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        order_status: {
            type: DataTypes.STRING,
        }
    })
}
