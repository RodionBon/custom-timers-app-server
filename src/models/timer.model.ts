import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import User from "./user.model";

const Timer = sequelize.define('timer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    exerciseDuration: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    restDuration: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    rounds: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'timer',
    timestamps: false,
    underscored: true
});

User.hasMany(Timer, { foreignKey: 'userId' });
Timer.belongsTo(User, { foreignKey: 'userId' });

export default Timer;

