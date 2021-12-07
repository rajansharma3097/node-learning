const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("Loaded / Route");
  res.send("<h2>Loaded / Route</h2>");
});

module.exports = router;