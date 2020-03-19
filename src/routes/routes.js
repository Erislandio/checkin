const routes = require("express").Router();
const authController = require("../app/controllers/authController");
const useController = require("../app/controllers/userController");
const authMiddleware = require("../app/middleware/auth");

routes.get("/", (req, res) => {
  return res.status(200).send({
    server: true,
    ok: true,
    running: true
  });
});

routes.post("/login", authController.login);
routes.post("/user", useController.store);
routes.post("/search", authMiddleware, useController.searchUserByLocation);
routes.get("/user", authMiddleware, useController.index);
routes.delete("/user", authMiddleware, useController.delete);
routes.patch("/address", authMiddleware, useController.editAddress);

module.exports = routes;
