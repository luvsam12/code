const Users = require("../models/user");
const Posts = require("../models/post");
const Comments = require("../models/comment");

var r = new Array();

exports.connectionData = async (req, res) => {
  var result = {};
  var connections = [];
  var connection = [];
  await Users.find({ _id: req.user.user_id })
    .then(async (user) => {
      // console.log(req.user.user_id);
      const mainuser = user;
      a = user[0].connections;
      var filteredArray = [];
      if (a.length > 0) {
        // console.log("A", a);
        var send_data = a.slice(0, 10);
        connections = send_data.map(async (conn) => {
          await Users.find({ _id: conn })
            .then((user) => {
              //console.log("User", user);
              d = user[0].connections;
              if (user[0].is_admin === 1) {
                user_type = "Admin";
              } else if (user[0].is_instructor === 1) {
                user_type = "Instructor";
              } else {
                user_type = "Student";
              }
              // console.log(mainuser)
              const follow = mainuser[0].following.includes(conn);
              // console.log(follow);
              if (d.length > 0) {
                filteredArray = a.filter(function (n) {
                  return d.indexOf(n) !== -1;
                });
                result = {
                  id: conn,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: filteredArray,
                  following: follow,
                };
              } else {
                result = {
                  id: conn,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: [],
                  following: follow,
                };
              }
            })
            .catch((err) => {
              console.log("ERROR", err);
            });
          return result;
        });
        const mutuals = await Promise.all(connections);
        res.status(200).json({
          success: true,
          msg: "Data available",
          list: mutuals,
          ids: a.slice(10, a.length),
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "NO connection request",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "no data found" });
    });
};

exports.pendingData = async (req, res) => {
  var result = {};
  var pending = [];
  var pendings = [];

  await Users.find({ _id: req.user.user_id })
    .then(async (user) => {
      const mainuser = user;
      // console.log("PENDING CONST USER", user);

      a = user[0].connections;
      b = user[0].pending;
      c = user[0].requested;

      var filteredArray = [];
      if (b.length > 0) {
        var send_data = b.slice(0, 10);
        pendings = send_data.map(async (pend) => {
          await Users.find({ _id: pend })
            .then((user) => {
              // console.log("USER PENDING", user);
              d = user[0].connections;
              if (user[0].is_admin === 1) {
                user_type = "Admin";
              } else if (user[0].is_instructor === 1) {
                user_type = "Instructor";
              } else {
                user_type = "Student";
              }
              const follow = mainuser[0].following.includes(pend);

              if (d.length > 0) {
                filteredArray = a.filter(function (n) {
                  return d.indexOf(n) !== -1;
                });
                result = {
                  id: pend,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: filteredArray,
                  following: follow,
                };
              } else {
                result = {
                  id: pend,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: [],
                  following: follow,
                };
              }
            })
            .catch((err) => {
              console.log("ERROR PENDING", err);
            });
          // console.log("PENDING RESULT", result);
          return result;
        });
        const mutuals = await Promise.all(pendings);
        // console.log("CONN", mutuals);
        res.status(200).json({
          success: true,
          msg: "Data available",
          list: mutuals,
          ids: b.slice(10, b.length),
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "NO pendings request",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "no data found" });
    });
};

exports.requestedData = async (req, res) => {
  var p = {};
  var r = {};
  var request = [];
  var requested = [];

  await Users.find({ _id: req.user.user_id })
    .then(async (user) => {
      // console.log("REQUSTED CONST USER", user);
      const mainuser = user;
      a = user[0].connections;
      b = user[0].pending;
      c = user[0].requested;

      var filteredArray = [];
      if (c.length > 0) {
        var send_data = c.slice(0, 10);
        request = send_data.map(async (requ) => {
          await Users.find({ _id: requ })
            .then((user) => {
              // console.log("USER REQUSTED", user);
              d = user[0].connections;
              if (user[0].is_admin === 1) {
                user_type = "Admin";
              } else if (user[0].is_instructor === 1) {
                user_type = "Instructor";
              } else {
                user_type = "Student";
              }
              const follow = mainuser[0].following.includes(requ);

              if (d.length > 0) {
                filteredArray = a.filter(function (n) {
                  return d.indexOf(n) !== -1;
                });
                result = {
                  id: requ,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: filteredArray,
                  following: follow,
                };
              } else {
                result = {
                  id: requ,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: [],
                  following: follow,
                };
              }
            })
            .catch((err) => {
              console.log("ERROR REQUSTED", err);
            });
          // console.log("REQUSTED RESULT", result);
          return result;
        });
        const mutuals = await Promise.all(request);
        // console.log("REQUSTED", mutuals);
        res.status(200).json({
          success: true,
          msg: "Data available",
          list: mutuals,
          ids: c.slice(10, c.length),
        });
      } else {
        res.status(200).json({
          success: true,
          msg: "NO Request",
        });
      }
    })
    .catch(() => {
      res.status(400).json({ success: false, msg: "no data found" });
    });
};

exports.suggestionData = async (req, res) => {
  lsd = {};
  var b, bp, br, bi;
  await Users.find({ _id: req.user.user_id })
    .then(async (user) => {
      if (user.length > 0) {
        const mainuser = user;
        b = user[0].connections;
        bp = user[0].pending;
        br = user[0].requested;
        bi = user[0].interest;
        result = b.map(async (requ) => {
          d = String(requ);
          await Users.find({ _id: d }).then(async (user) => {
            result1 = user.map(async (userA) => {
              x = userA.connections;

              result2 = x.map(async (userB) => {
                h = String(userB);
                lsd[h] = 5;
                await Users.find({ _id: h }).then((user) => {
                  for (n = 0; n < user.length; n++) {
                    g = user[n].connections;

                    for (o = 0; o < g.length; o++) {
                      lk = String(g[0]);
                      if (lk in lsd) {
                        val = parseInt(lsd[lk]);
                        lsd[lk] = val + 4;
                      } else {
                        lsd[lk] = 4;
                      }
                    }
                  }
                });
              });
              await Promise.all(result2);
            });
            await Promise.all(result1);
          });
        });
        await Promise.all(result);
        // console.log("BP",bp.length)
        result = bp.map(async (requ) => {
          d = String(requ);
          console.log("USER:", d);
          await Users.find({ _id: d }).then(async (user) => {
            result1 = user.map(async (userA) => {
              x = userA.connections;
              result2 = x.map(async (userB) => {
                h = String(userB);
                if (h in lsd) {
                  val = parseInt(lsd[h]);
                  lsd[h] = val + 4;
                } else {
                  lsd[h] = 4;
                }
                await Users.find({ _id: h }).then((user) => {
                  for (n = 0; n < user.length; n++) {
                    g = user[n].connections;
                    for (o = 0; o < g.length; o++) {
                      lk = String(g[0]);
                      if (lk in lsd) {
                        val = parseInt(lsd[lk]);
                        lsd[lk] = val + 2;
                      } else {
                        lsd[lk] = 2;
                      }
                    }
                  }
                });
              });
              await Promise.all(result2);
            });
            await Promise.all(result1);
          });
        });
        await Promise.all(result);
        // console.log("BR",br.length);
        result = br.map(async (requ) => {
          d = String(requ);
          await Users.find({ _id: d }).then(async (user) => {
            result1 = user.map(async (userA) => {
              x = userA.connections;
              result2 = x.map(async (userB) => {
                h = String(userB);
                if (h in lsd) {
                  val = parseInt(lsd[h]);
                  lsd[h] = val + 4;
                } else {
                  lsd[h] = 4;
                }
                await Users.find({ _id: h }).then((user) => {
                  for (n = 0; n < user.length; n++) {
                    g = user[n].connections;

                    for (o = 0; o < g.length; o++) {
                      lk = String(g[0]);
                      if (lk in lsd) {
                        val = parseInt(lsd[lk]);
                        lsd[lk] = val + 1;
                      } else {
                        lsd[lk] = 1;
                      }
                    }
                  }
                });
              });
              await Promise.all(result2);
            });
            await Promise.all(result1);
          });
        });
        await Promise.all(result);
        await Users.find({ interest: { $in: bi } }).then((user) => {
          for (i = 0; i < user.length; i++) {
            c = String(user[i]._id);
            if (c in lsd) {
              val = parseInt(lsd[c]);
              lsd[c] = val + 3;
            } else {
              lsd[c] = 3;
            }
          }
        });
        await Users.find({})
          .limit(100)
          .then((user) => {
            for (var lol = 0; lol < user.length; lol++) {
              if (user[lol]._id != req.user.user_id) {
                user_all = String(user[lol]._id);
                if (user_all in lsd) {
                  val = parseInt(lsd[user_all]);
                  lsd[user_all] = val + 0;
                } else {
                  lsd[user_all] = 0;
                }
              }
            }
          });
        bc = new Set(b);
        bp = new Set(bp);
        br = new Set(br);
        const filteredData = Object.entries(lsd).reduce((acc, [key, val]) => {
          if (!bc.has(key) && !bp.has(key) && !br.has(key)) {
            acc[key] = val;
          }
          return acc;
        }, {});
        // console.log(sorted);
        let suggestions = Object.keys(filteredData).sort(function (a, b) {
          return lsd[b] - lsd[a];
        }); //this is for without values
        var send_data = suggestions.slice(0, 20);
        // console.log("SEND", send_data);
        suggest = send_data.map(async (id) => {
          // console.log("SLICE", id[0]);
          await Users.find({ _id: id })
            .then((user) => {
              // console.log("USER", user);
              d = user[0].connections;
              // console.log("D", d);
              if (user[0].is_admin === 1) {
                user_type = "Admin";
              } else if (user[0].is_instructor === 1) {
                user_type = "Instructor";
              } else {
                user_type = "Student";
              }
              const follow = mainuser[0].following.includes(user);

              if (d.length > 0) {
                filteredArray = b.filter(function (n) {
                  return d.indexOf(n) !== -1;
                });
                result = {
                  id: id,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: filteredArray,
                  following: follow,
                };
              } else {
                result = {
                  id: id,
                  name: user[0].full_name,
                  type: user_type,
                  mutual: [],
                  following: follow,
                };
              }
            })
            .catch((err) => {
              // console.log("ERR", err);
              res.status(400).json({
                success: false,
                msg: "ERR IN MUTAL DATA",
              });
            });
          return result;
        });
        suggests = await Promise.all(suggest);
        res.status(200).json({
          success: true,
          msg: "Data available",
          list: suggests,
          ids: suggestions.slice(20, suggestions.length),
        });
      } else {
        res.status(404).json({
          success: true,
          msg: "No such user",
        });
      }
    })
    .catch((err) => {
      // console.log("ERR", err);
      res.status(400).json({ success: false, msg: "No Data Found" });
    });
};

exports.getMutuals = async (req, res) => {
  try {
    const mainuser = await Users.find({ _id: req.user.user_id })
      .then((data) => {
        return data;
      })
      .catch(() => {
        res.status(500).json({
          status: false,
          msg: "User Error",
        });
      });
    mutual = req.query.data.map(async (id) => {
      // console.log("SLICE", id[0]);
      await Users.find({ _id: id })
        .then((user) => {
          // console.log("USER", user);
          d = user[0].connections;
          // console.log("D", d);
          if (user[0].is_admin === 1) {
            user_type = "Admin";
          } else if (user[0].is_instructor === 1) {
            user_type = "Instructor";
          } else {
            user_type = "Student";
          }
          const follow = mainuser[0].following.includes(user);

          if (d.length > 0) {
            filteredArray = mainuser[0].connections.filter(function (n) {
              return d.indexOf(n) !== -1;
            });
            result = {
              id: id,
              name: user[0].full_name,
              type: user_type,
              mutual: filteredArray,
              following: follow,
            };
          } else {
            result = {
              id: id,
              name: user[0].full_name,
              type: user_type,
              mutual: [],
              following: follow,
            };
          }
        })
        .catch(() => {
          console.log("ERR", err);
          res.status(400).json({
            success: false,
            msg: "ERR IN MUTAL DATA",
          });
        });
      return result;
    });
    mutuals = await Promise.all(mutual);
    res.status(200).json({
      success: true,
      msg: "Data available",
      list: mutuals,
    });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json({
      success: false,
      msg: "No Feeds",
    });
  }
};
