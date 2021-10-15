const jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT(req, res, next) {
    let token = req.headers["authorization"];
    if (!token)
      return res.status(401).json({ message: "token não encontrado" });
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return res.status(401).end();
      req.userId = decoded.userId;
      next();
    });
  },
};
