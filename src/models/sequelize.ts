require('dotenv').config();
import { Sequelize } from "sequelize";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`);

export default sequelize;