import { PhoneModel } from "./phone.model";
import { ProductModel } from "./product.model";

const { UserModel } = require("./users.roles.model");
const { RoleModel } = require("./user.model"); 

const models = [
  RoleModel,
  UserModel,
  PhoneModel,
  ProductModel
];

module.exports = models;