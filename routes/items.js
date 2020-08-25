// CRUD

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Item = require("../models/Item");

// @route   GET api/items
// @desc    Get all users items
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ date: -1 }); // most recent items first

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/items
// @desc    Add new item
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("item1", "Item is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destruc
    const { quantity, type, item1 } = req.body;

    try {
      const newItem = new Item({
        item1,
        quantity,
        type,
        user: req.user.id
      });

      // save to db
      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   PUT api/items/:id
// @desc    Update items
// @access  Private
router.put("/:id", auth, async (req, res) => {
  // destruc
  const { quantity, type, item1 } = req.body;

  // Build Item object
  const itemFields = {};
  if (item1) itemFields.item1 = item1;
  if (quantity) itemFields.quantity = quantity;
  if (type) itemFields.type = type;

  try {
    let item = await Item.findById(req.params.id);

    // if item is not found
    if (!item) return res.status(404).json({ msg: "Item not Found" });

    // make sure user owns items
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // update
    item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        $set: itemFields
      },
      { new: true }
    ); // if the item doesnt exist create it

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    // if item is not found
    if (!item) return res.status(404).json({ msg: "Item not Found" });

    // make sure user owns items
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete
    await Item.findByIdAndDelete(req.params.id);

    res.json({ msg: "Item Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
