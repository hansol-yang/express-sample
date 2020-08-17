const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('..');
const bcrypt = require('bcrypt');

class User extends Model {}
User.init(
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                try {
                    const hashed = await bcrypt.hash(user.password, 10);
                    user.password = hashed;
                } catch (e) {
                    console.log('에러 핸들링', e);
                }
            },
        },
    }
);
module.exports = User;
