module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        role_name: {
            type: DataTypes.STRING
        }
    })
}