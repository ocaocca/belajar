module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING(200),
        kelas: type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE, 

    },
    {
        freezeTableName: true,
        underscored: true, 
    }
    );
};