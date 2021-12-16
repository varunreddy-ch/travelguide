const winston = require("winston");
const auth = require("../middleware/auth");
const { Tovisit } = require("../models/tovisit");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const tovisits = await Tovisit.find().sort({ date: -1 });
    const filteredTovisits = tovisits.filter(tovisit => tovisit.uid === req.user._id);
    res.send(filteredTovisits);
  } catch (error) {
    res.status(500).send("Error: " + error.message);

    winston.error(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { name, author, isComplete, date, uid } = req.body;

  let tovisit = new Tovisit({ name, author, isComplete, date, uid });

  tovisit = await tovisit.save();
  res.send(tovisit);
});

router.put("/:id", auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  const tovisit = await Tovisit.findById(req.params.id);

  if (!tovisit) return res.status(404).send("Tovisit not found...");

  if (tovisit.uid !== req.user._id)
    return res.status(401).send("Tovisit update failed. Not authorized...");

  const { name, author, isComplete, date, uid } = req.body;

  const updatedTovisit = await Tovisit.findByIdAndUpdate(
    req.params.id,
    { name, author, isComplete, date, uid },
    { new: true }
  );

  res.send(updatedTovisit);
});

router.patch("/:id", auth, async (req, res) => {
  const tovisit = await Tovisit.findById(req.params.id);

  if (!tovisit) return res.status(404).send("Tovisit not found...");

  if (tovisit.uid !== req.user._id)
    return res.status(401).send("Tovisit check/uncheck failed. Not authorized...");

  const updatedTovisit = await Tovisit.findByIdAndUpdate(
    req.params.id,
    {
      isComplete: !tovisit.isComplete,
    },
    {
      new: true,
    }
  );

  res.send(updatedTovisit);
});

router.delete("/:id", auth, async (req, res) => {
  const tovisit = await Tovisit.findById(req.params.id);

  if (!tovisit) return res.status(404).send("Tovisit not found...");

  if (tovisit.uid !== req.user._id)
    return res.status(401).send("Tovisit deletion failed. Not authorized...");

  const deletedTovisit = await Tovisit.findByIdAndDelete(req.params.id);

  res.send(deletedTovisit);
});

module.exports = router;
