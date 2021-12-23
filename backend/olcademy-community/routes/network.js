const express = require("express");
const router = express.Router();

//middleware function
const auth = require("../middleware/auth");

//Controller functions
const {
    connectionData,
    pendingData,
    requestedData,
    suggestionData,
    getMutuals,
  } = require("../controllers/network.js");

router.get("/connection", auth, connectionData);

router.get('/pending', auth, pendingData);

router.get("/requested", auth, requestedData);

router.get("/suggestion", auth, suggestionData);

router.get('/getMutuals', auth, getMutuals);

module.exports = router;