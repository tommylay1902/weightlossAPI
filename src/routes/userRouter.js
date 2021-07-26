const express = require("express");
const router = express.Router();
const auth = require("../middleware/verifyToken");
const UserController = require("../controller/UserController");

const uc = new UserController();

/**
 * @swagger
 * /users/me:
 *  get:
 *    summary: Get user information
 *    description: This endpoint returns user information
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    responses:
 *        200:
 *            description: It's ok and endpoint returns user information
 *        400:
 *            description: Bad request from user
 *        403:
 *            description: user is not logged in/no token is provided
 *        404:
 *            description: user is not found in the database
 */
router.get("/me", auth, uc.getUser);

/**
 * @swagger
 * /users:
 *  post:
 *    description: This endpoint creates a user within the database
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    responses:
 *        201:
 *            description: user succesfully created
 *        400:
 *            description: Bad request from user
 *        403:
 *            description: user is not logged in/no token is provided
 */
router.post("", uc.createUser);

/**
 * @swagger
 * /users/delete:
 *  delete:
 *    description: This endpoint deletes the user in the database
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    responses:
 *        200:
 *            description: It's ok and endpoint returns user information
 *        400:
 *            description: Bad request from user
 *        403:
 *            description: user is not logged in/no token is provided
 */
router.delete("/delete", auth, uc.deleteUser);

module.exports = router;
