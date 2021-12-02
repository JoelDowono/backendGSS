module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        user_mail: {
            type: DataTypes.STRING,
            unique: {
                msg: `L'adresse email est déjà prise.`
            },
            isEmail: {
                msg: 'Adresse email non valide.'
            }
        },
        user_password: {
            type: DataTypes.STRING,
        },
    })
}
