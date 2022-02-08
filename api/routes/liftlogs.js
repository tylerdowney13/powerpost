const router = require("express").Router();
const Liftlog = require("../models/Liftlog");
const User = require("../models/User");

// CREATE new liftlog
router.post("/", async (req, res) => {
  const newLiftlog = new Liftlog(req.body);

  try {
    const savedLiftlog = await newLiftlog.save();
    await User.findOneAndUpdate(
      { _id: savedLiftlog.userId },
      { liftlogid: savedLiftlog._id }
    );
    res.status(200).json(savedLiftlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET liftlog
router.get("/:liftlogId", async (req, res) => {
  const liftlogId = req.params.liftlogId;
  try {
    const liftlog = await Liftlog.findOne({ _id: liftlogId });
    res.status(200).json(liftlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE liftlog squat array
router.put("/updatesquat/:liftlogId", async (req, res) => {
  const liftlogId = req.params.liftlogId;
  const liftlogData = req.body.liftDataValue;
  res.json(liftlogData);

  try {
    const liftlog = await Liftlog.findOne({ _id: liftlogId });

    const newMaxSquat = parseInt(liftlogData);
    const oldMaxSquat = parseInt(liftlog.maxSquat);

    const oldTotal = parseInt(liftlog.total[liftlog.total.length - 1].weight);
    console.log(oldTotal);
    const newTotal = oldTotal - oldMaxSquat + newMaxSquat;

    await liftlog.updateOne({
      $push: { squat: { weight: liftlogData, date: Date.now() } },
    });

    if (newMaxSquat > oldMaxSquat) {
      try {
        console.log("Updating Max Squat");
        await liftlog.updateOne({ $set: { maxSquat: newMaxSquat } });
        console.log("Max Squat Updated");
        console.log("Updating Total");
        await liftlog.updateOne({
          $push: { total: { weight: newTotal, date: Date.now() } },
        });
        console.log("Total Updated");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE liftlog bench array
router.put("/updatebench/:liftlogId", async (req, res) => {
  const liftlogId = req.params.liftlogId;
  const liftlogData = req.body.liftDataValue;
  res.json(liftlogData);

  try {
    const liftlog = await Liftlog.findOne({ _id: liftlogId });

    const newMaxBench = parseInt(liftlogData);
    const oldMaxBench = parseInt(liftlog.maxBench);

    const oldTotal = parseInt(liftlog.total[liftlog.total.length - 1].weight);
    console.log(oldTotal);
    const newTotal = oldTotal - oldMaxBench + newMaxBench;

    await liftlog.updateOne({
      $push: { bench: { weight: liftlogData, date: Date.now() } },
    });

    if (newMaxBench > oldMaxBench) {
      try {
        console.log("Updating Max Bench");
        await liftlog.updateOne({ $set: { maxBench: newMaxBench } });
        console.log("Max Bench Updated");
        console.log("Updating Total");
        await liftlog.updateOne({
          $push: { total: { weight: newTotal, date: Date.now() } },
        });
        console.log("Total Updated");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE liftlog deadlift array
router.put("/updatedeadlift/:liftlogId", async (req, res) => {
  const liftlogId = req.params.liftlogId;
  const liftlogData = req.body.liftDataValue;
  res.json(liftlogData);

  try {
    const liftlog = await Liftlog.findOne({ _id: liftlogId });

    const newMaxDeadlift = parseInt(liftlogData);
    const oldMaxDeadlift = parseInt(liftlog.maxDeadlift);

    const oldTotal = parseInt(liftlog.total[liftlog.total.length - 1].weight);
    console.log(oldTotal);
    const newTotal = oldTotal - oldMaxDeadlift + newMaxDeadlift;

    await liftlog.updateOne({
      $push: { deadlift: { weight: liftlogData, date: Date.now() } },
    });

    if (newMaxDeadlift > oldMaxDeadlift) {
      try {
        console.log("Updating Max Deadlift");
        await liftlog.updateOne({ $set: { maxDeadlift: newMaxDeadlift } });
        console.log("Max Deadlift Updated");
        console.log("Updating Total");
        await liftlog.updateOne({
          $push: { total: { weight: newTotal, date: Date.now() } },
        });
        console.log("Total Updated");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE liftlog deadlift array
router.put("/updatetotal/:liftlogId", async (req, res) => {
  const liftlogId = req.params.liftlogId;
  const liftlogData = req.body.liftDataValue;
  res.json(liftlogData);

  try {
    const liftlog = await Liftlog.findOne({ _id: liftlogId });
    await liftlog.updateOne({
      $push: { total: { weight: liftlogData, date: Date.now() } },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
