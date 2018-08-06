const sql = require('sequelize');
module.exports = {
    name: 'tag',
    options: {
        indexes: [
            {
                fields: ['name']
            }
        ]
    },
    schema: {
        id: {
            type: sql.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: sql.INTEGER,
            allowNull: false
        },
        name: {
            type: sql.STRING,
            allowNull: false
        }
    }
};
