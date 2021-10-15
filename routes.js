const express = require("express");
const showProducts = require("./src/controllers/ItemsController");
const authMiddleware = require("./middlewares/authorizationMiddleware");
const login = require("./src/controllers/UsersController");

const routes = express.Router();
routes.get("/", (req, res) => {
  res.json({ message: "Bem vindo" });
});

routes.post("/login", login.login);

routes.get(
  "/products/:organizationName",
  authMiddleware.verifyJWT,
  showProducts.showProductsByRoles
);

module.exports = routes;
