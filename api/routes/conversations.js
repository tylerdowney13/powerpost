const router = require("express").Router();
const Conversation = require("../models/Conversation");

// NEW conversation
router.post("/", async (req, res) => {
  console.log(req.body);
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    conversationId: req.body.conversationId,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET conversation of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: req.params.userId },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
