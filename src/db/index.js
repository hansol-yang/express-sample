const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('develop', 'root', '123123123', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.sequelize = sequelize;

const { User } = require('./models');
exports.testDB = async () => {
    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
