const fs = require("fs");
let datarawusers = fs.readFileSync("./users.json");
let users = JSON.parse(datarawusers);

module.exports = users;
