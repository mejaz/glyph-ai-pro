import sequelize from "@/database/sequelize.config";
import Visitor from "@/models/visitor";

export default async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Sync all models with the database
    await sequelize.sync({force: false});
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

