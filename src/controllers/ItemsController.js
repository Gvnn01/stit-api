const fs = require("fs");
const jwt = require("jsonwebtoken");
const readline = require("readline");
let items = [];
let itemsByRole = {};
let dataraworganization = fs.readFileSync("./organization.json");
let users = require("../utils/UsersList");
let organization = JSON.parse(dataraworganization);
let rd = readline.createInterface({
  input: fs.createReadStream("./products.txt"),
});

rd.on("line", (line) => {
  items.push(JSON.parse(line));
});

let categoriesByLvl = {};
categoriesByLvl.senior = organization.map((item) => {
  return item;
});
categoriesByLvl.middle = organization.filter((item) => {
  if (item.level === 2 || item.level === 1) {
    return true;
  }
});
categoriesByLvl.junior = organization
  .filter((item) => {
    if (item.level === 2) {
      return true;
    }
  })
  .map((item) => {
    return item;
  });
categoriesByLvl.intern = organization
  .filter((item) => {
    if (item.name === "STUFF A" && item.level !== 3) {
      return true;
    }
    return false;
  })
  .map((item) => {
    return item;
  });

module.exports = {
  async showProductsByRoles(req, res) {
    let token = req.headers["authorization"];
    let param = req.params["organizationName"];
    let query = req.query["tags"];
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return res.status(401).end();
      token = decoded.userId;
      return token;
    });
    let role = users
      .filter((user) => {
        if (user["userId"] === token) {
          return user["roles"];
        }
      })
      .map((item) => {
        return item.roles.toString();
      });
    itemsByRole[role] = items.filter((item) => {
      for (let i = 0; i < categoriesByLvl[role].length; i++) {
        if (
          item["department"] === categoriesByLvl[role][i]["name"] &&
          item["department"] === param
        ) {
          return item;
        }
      }
    });
    if (query !== undefined) {
      query = query.split(",");
      itemsByRole[role] = itemsByRole[role].filter((item) => {
        for (let i = 0; i < item["tags"].length; i++) {
          for (let j = 0; j < query.length; j++) {
            if (item["tags"][i] === query[j]) {
              return item;
            }
          }
        }
      });
    }
    let itemsQnt = itemsByRole[role].length;
    return res.json({ "Total: ": itemsQnt, "products:": itemsByRole });
  },
};
