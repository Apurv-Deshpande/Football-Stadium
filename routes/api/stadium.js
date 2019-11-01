const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Stadium = require("../../models/Stadium");

router.get("/me", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    if (!stadium) {
      return res.status(400).json({ msg: "There is no stadium for this user" });
    }

    res.json(stadium);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/stadium
// @desc     Create a stadium
// @access   Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, image, club, cost, location } = req.body;

      const user = req.user.id;

      const newStadium = new Stadium({
        name: name,
        image: image,
        club: club,
        cost: cost,
        location: location,

        user: user
      });

      const stadium = newStadium.save();

      res.json(stadium);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, image, club, cost, location } = req.body;
    const newData = { name, image, club, cost, location };

    const stadium = await Stadium.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    await stadium.save();
    return res.json(stadium);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/stadiums
// @desc     Get all stadiums
// @access   Private
router.get("/", async (req, res) => {
  try {
    const stadiums = await Stadium.find().sort({ date: -1 });
    res.json(stadiums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/stadium/:id
// @desc     Get post by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    if (!stadium) {
      return res.status(404).json({ msg: "Stadium not found" });
    }
    3;
    res.json(stadium);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Stadium not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    if (!stadium) {
      return res.status(404).json({ msg: "Stadium not found" });
    }

    if (stadium.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await stadium.remove();

    res.json({ msg: "Stadium removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Stadium not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const stadium = await Stadium.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,

        user: req.user.id
      };

      stadium.comments.unshift(newComment);

      await stadium.save();

      res.json(stadium.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    // Pull out comment
    const comment = stadium.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = stadium.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    stadium.comments.splice(removeIndex, 1);

    await stadium.save();

    res.json(stadium.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/like/:id/:comment_id", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    const comment = stadium.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (
      comment.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Comment already liked" });
    }

    comment.likes.unshift({ user: req.user.id });

    await stadium.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:id/:comment_id", auth, async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    const comment = stadium.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Check if the post has already been liked
    if (
      comment.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Comment has not yet been liked" });
    }

    // Get remove index
    const removeIndex = comment.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    comment.likes.splice(removeIndex, 1);

    await stadium.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
