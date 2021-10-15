const jwt = require("jsonwebtoken");
let users = require("../utils/UsersList");

module.exports = {
  login(req, res) {
    users.map((user) => {
      if (
        req.body.email === user.email &&
        req.body.password === user.password
      ) {
        const token = jwt.sign({ userId: user.userId }, "secret", {
          expiresIn: 1000,
        });
        res.header("Authorization", token);
        return res.json({ auth: true, token });
      }
    });
    res.status(401).end();
  },
};
