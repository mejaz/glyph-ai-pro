import sequelize from "@/database/sequelize.config";
import {DataTypes} from "sequelize"

const Visitor = sequelize.define('Visitor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  outTime: {
    type: DataTypes.STRING,
  },
  sign: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Visitor;