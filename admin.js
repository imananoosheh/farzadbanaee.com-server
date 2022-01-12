const mongoose = require("mongoose");
const admin = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model("Admin", admin);