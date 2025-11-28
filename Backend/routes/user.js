const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/UserController'); // ← FIXED
const {getStudents} = require("../controller/studentcontroller");

router.post('/register', register);
router.get("/students", getStudents);

router.post('/login', login);

module.exports = router;