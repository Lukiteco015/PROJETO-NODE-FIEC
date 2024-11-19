const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const authMiddlewareAdmin = require("../middleware/authMiddlewareAdmin");


router.get("/", authMiddleware, userController.get_users);
router.get("/self", authMiddleware, userController.get_user_principal);
router.get("/:id", authMiddleware, userController.get_user);
router.put("/:id/role", authMiddlewareAdmin, userController.update_role);
router.put("/:id", authMiddleware, userController.update_user);
router.delete("/:id", authMiddleware, userController.delete_user);


module.exports = router;
