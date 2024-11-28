const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require('../middleware/authMiddleware')

router.post("/create", authMiddleware, feedbackController.createFeedback);

router.get("/score", feedbackController.getAllFeedbacks);

router.get("/:id", feedbackController.getFeedbackId);

router.get("/:id/liked", authMiddleware,feedbackController.userHasLiked);

router.put("/edit/:title", authMiddleware, feedbackController.editFeedback);

router.delete("/delete/:id", authMiddleware, feedbackController.deleteFeedback);

router.patch("/like/:id/like", authMiddleware, feedbackController.likeFeedback);

module.exports = router;
