import { Sequelize, DataTypes } from "sequelize";
import { Pool } from "pg";

export const db = {
    initialized: false,
    initialize,
};

async function initialize() {
    const DB_URL = process.env.DB_URL;
    const pool = new Pool({
        connectionString: DB_URL,
        ssl: true,
    });

    const client = await pool.connect();
    try {
        console.log("Connected to DB...");
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
    db.Category = categoryModel(sequelize)

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
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        otp: { type: DataTypes.STRING, }
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
function categoryModel(sequelize) {
    const attributes = {
        categoryName: { type: DataTypes.STRING, allowNull: false },
        interested: { type: DataTypes.STRING, allowNull: false },
    };


    return sequelize.define("Category", attributes);
}