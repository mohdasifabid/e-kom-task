import getConfig from "next/config";
import { Sequelize, DataTypes } from "sequelize";
import { Pool } from "pg";
const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize,
};

async function initialize() {
    const { DB_URL } = serverRuntimeConfig.dbConfig;
    const pool = new Pool({
        connectionString: DB_URL,
        ssl: true,
    });

    const client = await pool.connect();
    try {
        console.log("RAN");
    } catch (error) {
        if (error.code !== "42P04") {
            throw error;
        }
    } finally {
        client.release();
    }

    const sequelize = new Sequelize(DB_URL, {
        dialect: "postgres",
        dialectModule: require("pg"),
    });

    db.User = userModel(sequelize);

    await sequelize.sync({ alter: true });

    db.initialized = true;
}


function userModel(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        isVerified: { type: DataTypes.BOOLEAN, default: false },
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ["hash"] },
        },
        scopes: {
            withHash: { attributes: {} },
        },
    };

    return sequelize.define("User", attributes, options);
}