import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    encryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false,
    underscored: true
});

export default User;

