const express = require("express");
const handle = require("../../lib/error_handler");
const passport = require("passport");
const requireToken = passport.authenticate("bearer", { session: true });
const customErrors = require("../../lib/custom_errors");
// const handle404 = customErrors.handle404;
// const requireOwnership = customErrors.requireOwnership;
const Codes = require("../models/code.js");
const router = express.Router();

router.get("/codes", requireToken, (req, res) => {
  Codes.find()
    .then(codes => res.status(200).json({ codes: codes }))
    .catch(error => console.log(error));
});
router.get("/codes/:id", requireToken, (req, res) => {
  Codes.findById(req.params.id)
    .then(code => res.status(200).json({ code }))
    .catch(error => console.log(error));
});
router.post("/codes", requireToken, (req, res) => {
  req.body.code.userID = req.user.id;
  Codes.create(req.body.code)
    .then(createdCode => res.status(201).json({ note: createdCode }))
    .catch(error => console.log(error));
});
router.patch("/codes/:id", requireToken, (req, res) => {
  Codes.findByIdAndUpdate(
    req.params.id,
    req.body.code,
    { new: true },
    (err, good) => {
      if (err) {
        res.status(500).send("Error trying to patch");
        return;
      }
      res.status(200).json(good);
    }
  );
});
router.delete("/codes/:id", requireToken, (req, res) => {
  Codes.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send("Code Snippet successfully deleted!!");
  });
});

module.exports = router;
