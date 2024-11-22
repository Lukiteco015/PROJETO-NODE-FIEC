const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/create", feedbackController.createFeedback);

router.get("/score", feedbackController.getAllFeedbacks);

router.put("/edit/:title", feedbackController.editFeedback);

router.delete("/delete/:id", feedbackController.deleteFeedback);

router.patch("/like/:id/like", feedbackController.likeFeedback);

module.exports = router;
