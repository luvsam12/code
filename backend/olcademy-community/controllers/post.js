const Posts = require("../models/post");
const Users = require("../models/user");
const Comments = require("../models/comment");
const ReplyComments = require("../models/commentreply");
const Notifications = require("../models/notification");
const Reports = require("../models/report");
const ViewDetails = require("../models/viewdetails");
const cloudinary = require("cloudinary").v2;
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DATABASE, {
  useUnifiedTopology: true,
});

cloudinary.config({
  cloud_name: "dxvc9qd2g",
  api_key: "765672581547499",
  api_secret: "cbU_DCL9fDVy6K-ymkaW2EfnCHA",
});

const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");

exports.getBlogs = (req, res) => {
  Posts.find({ show: 1, post_type: "Blogs" })
    .sort({ published_on: -1 })
    .populate("category")
    .populate("user_id", "followers")
    .then((posts) => {
               let blogs = posts.slice(0,10);
		let ids = posts.map((post) => post.id)
		ids = ids.slice(11);
      res.status(200).json({blogs, ids});
		 
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("No Blog Found");
    });
};

exports.getForums = (req, res) => {
  Posts.find({ show: 1, post_type: "Forums" })
    .sort({ published_on: -1 })
    .populate("category")
    .populate("user_id", "followers")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(404).send("No Forums Found");
    });
};
// changed by nagvarun and naman to get next set of blogs
exports.getSinglePost = async(req, res) => {
 
  const ids=req.body.ids;
  if(ids!== undefined)
  {
    let allData=[];
   for(let id of ids){
  await Posts.findOne({ _id: ObjectId(id) })
    .populate("category")
    .populate("user_id", "followers")
    .then((post) => {
    // post["category"]=post["category"]["_id"]
      allData.push(post)
    })
    .catch((err) => {
      console.log(err)
      res.status(404).send("No Post Found");
    });
  }
          res.status(200).json(allData)
  // res.status(200).json({allData})
  
  // Posts.findOne({ _id: ObjectId(req.params.post_id) })
  //   .populate("category")
  //   .populate("user_id", "followers")
  //   .then((post) => {
  //     res.json(post);
  //   })
  //   .catch((err) => {
  //     res.status(404).send("No Post Found");
  //   });
}
};

exports.getPostByCategory = (req, res) => {
  Posts.find({ category: req.params.category_name.trim() })
    .populate("category")
    .populate("user_id", "followers")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(404).send("No post Found");
    });
};

exports.createPost = async (req, res) => {
  // await cloudinary.uploader.upload(
  //   req.files[0].path,
  //   {
  //     resource_type: "video",
  //     chunk_size: 6000000,
  //     eager: [
  //       { width: 300, height: 300, crop: "pad", audio_codec: "none" },
  //       {
  //         width: 160,
  //         height: 100,
  //         crop: "crop",
  //         gravity: "south",
  //         audio_codec: "none",
  //       },
  //     ],
  //     eager_async: true,
  //     eager_notification_url: "https://mysite.example.com/notify_endpoint",
  //   },
  //   function (error, result) {
  //     console.log(result, error);
  //   }
  // );
  if (req.body.media == "empty") {
    req.body.media = [];
  }
  if (req.body.media_tag == "empty") {
    req.body.media_tag = [];
  }
  if (req.body.hashtags == "empty") {
    req.body.hashtags = [];
  }
  var media_public_id = [];
  // for (let i = 0; i < req.body.del_media_array.length; i++) {
  //   fs.unlinkSync(req.body.del_media_array[i]);
  // }
  // console.log(typeof req.body.media)
  // if(typeof req.body.media === "string"){
  //   req.body.media = [req.body.media];
  // }
  // for (let i = 0; i < req.body.media.length; i++) {
  //   await cloudinary.uploader.upload(
  //     req.body.media[i],
  //     // './public/uploads/1625385571204.webp',
  //     // "./public/uploads/1625389280602.webp",
  //     { folder: "postImages" },
  //     function (err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(result)
  //         // fs.unlinkSync('./public/uploads/1615568388774.webp');
  //         req.body.media[i] = result.url;
  //         req.body.media_tag[i] = "<div><img src='" + result.url + "' ></div>";
  //         media_public_id.push(result.public_id);
  //       }
  //     }
  //   );
  // }
  const date = new Date();
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);

  const post = new Posts({
    user_id: req.user.user_id,
    post_title: req.body.post_title,
    author_name: req.body.author_name,
    post_content: req.body.post_content,
    category: req.body.category,
    hashtags: req.body.hashtags,
    media: req.body.media,
    media_tag: req.body.media_tag,
    post_type: req.body.post_type,
    published_on: date,
    media_public_id: media_public_id,
  });

  post
    .save()
    .then(() => {
      res.status(200).json({ success: true, msg: "Post created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "error creating the post" });
    });
};

exports.updatePost = async (req, res) => {
  Posts.findOne({ _id: ObjectId(req.params.post_id) }).then(async (post) => {
    for (var i = 0; i < post.media_public_id.length; i++) {
      await cloudinary.uploader.destroy(
        post.media_public_id[i],
        function (err, result) {
          if (err) return res.status(400).json({ success: false, err });
        }
      );
    }
  });

  if (req.body.del_media_array == "empty") {
    req.body.del_media_array = [];
  }
  if (req.body.media == "empty") {
    req.body.media = [];
  }
  if (req.body.media_tag == "empty") {
    req.body.media_tag = [];
  }
  if (req.body.hashtags == "empty") {
    req.body.hashtags = [];
  }
  var media_public_id = [];
  for (let i = 0; i < req.body.media.length; i++) {
    await cloudinary.uploader.upload(
      req.body.media[i],
      { folder: "postImages" },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          fs.unlinkSync(req.body.media[i]);
          req.body.media[i] = result.url;
          req.body.media_tag[i] = "<div><img src='" + result.url + "' ></div>";
          media_public_id.push(result.public_id);
        }
      }
    );
  }

  const updatedPost = {
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    category: req.body.category,
    hashtags: req.body.hashtags,
    media: req.body.media,
    media_tag: req.body.media_tag,
    media_public_id: media_public_id,
  };
  req.body.del_media_array.forEach((file) => {
    fs.unlinkSync(file, (err) => {
      if (err) throw err;
    });
  });
  Posts.updateOne({ _id: ObjectId(req.params.post_id) }, updatedPost)
    .then(() => res.status(200).json({ success: true, msg: "post updated" }))
    .catch((err) =>
      res.status(400).json({ success: false, msg: "can't update post" })
    );
};

//Delete post
exports.deletePost = (req, res) => {
  Posts.findOne({ _id: ObjectId(req.params.post_id) })
    .then((post) => {
      // post.media.forEach((file) => {
      //   console.log(file);
      //   fs.unlinkSync(file, (err) => {
      //     if (err) throw err;
      //     console.log("deleted");
      //   });
      // });

      //Delete Comments of Post
      Comments.deleteMany({ post_id: req.params.post_id })
        .then(() => {
          //Delete Replies of Post
          ReplyComments.deleteMany({ post_id: req.params.post_id })
            .then(() => {
              //Delete Reports of that post
              Reports.deleteMany({ post_id: req.params.post_id })
                .then(() => {
                  //Delete id of that post from user bookmarked array
                  Users.updateMany(
                    { _id: { $in: post.bookmarks } },
                    { $pull: { bookmarks: req.params.post_id } }
                  )
                    .then(() => {
                      //Delete notifications of that post
                      Notifications.deleteMany({ post_id: req.params.post_id })
                        .then(() => {
                          res
                            .status(200)
                            .json({ success: true, msg: "Post deleted" });
                        })
                        .catch(() => {
                          res.status(400).json({
                            success: false,
                            msg: "error deleting notifications",
                          });
                        });
                    })
                    .catch((err) => {
                      res.status(400).json({
                        success: false,
                        msg: "error deleting boomarks",
                      });
                    });
                })
                .catch((err) => {
                  res.status(400).json({
                    success: false,
                    msg: "can't delete reports of posts",
                  });
                });
            })
            .catch(() => {
              res
                .status(400)
                .json({ success: false, msg: "can't delete replies of posts" });
            });
        })
        .catch(() => {
          res
            .status(400)
            .json({ success: false, msg: "can't delete comments of posts" });
        });

      post.remove();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, msg: "can't delete post" });
    });
};

// blog recommendation
exports.getRecommendation = async (req, res) => {
  async function score() {
    let posts_score = {};

    temp = posts.map((i) => {
      let post_id = i["_id"];
      let scr =
        i["num_of_views"] * 20 +
        i["likes"].length * 40 +
        i["comments"] * 60 +
        i["num_of_shares"] * 100 +
        i["notifications"].length * 70;
      let report =
        i["spam"] * 15 +
        i["inappropriate_content"] * 35 +
        i["harassment"] * 25 +
        i["copyright_issue"] * 45 +
        i["other"] * 10;
      let published_time = i["published_on"];
      let current_time = new Date();
      let hours = ((current_time - published_time) / 1000000) % 3600;
      let score = (scr - report) / hours;
      if (score > 0) {
        posts_score[post_id.toString()] = score;
      }
    });
    await Promise.all(temp);
    // console.log("SCORE: ", posts_score);
    return posts_score;
  }

  //making a dictionary of posts of users
  async function users_post(id) {
    let users_post = [];
    temp = posts.map((i) => {
      if (i["user_id"] === id) {
        users_post.push(i["_id"].toString());
      }
      // console.log(users_post)
    });
    await Promise.all(temp);
    // console.log("FUN USER POST: ", users_post);
    return users_post;
  }

  //cdictionary of users liked post's category and dictionary of liked posts of a user
  async function liked_categories() {
    let liked_cat = {};
    temp = posts.map(async (i) => {
      temp = i["likes"].map((j) => {
        //dictionary of users liked post's category
        if (liked_cat[j] === undefined) {
          liked_cat[j] = [];
          liked_cat[j].push(i["category"].toString());
        } else {
          liked_cat[j].push(i["category"].toString());
        }
      });
      await Promise.all(temp);
    });
    await Promise.all(temp);
    // console.log("FUN LIKED CAT", liked_cat);
    return liked_cat;
  }

  async function posts_category() {
    let category = {};
    temp = posts.map((i) => {
      //categories
      category[i["_id"].toString()] = i["category"].toString();
    });
    await Promise.all(temp);
    return category;
  }

  async function liked_posts(id) {
    let liked_posts = [];
    temp = posts.map(async (i) => {
      temp = i["likes"].map((j) => {
        if (j === id) {
          liked_posts.push(i["_id"].toString());
        }
      });
      await Promise.all(temp);
    });
    await Promise.all(temp);
    return liked_posts;
  }

  try {
    // calculating the score of posts
    var posts = await Posts.find({})
      .then((post) => {
        return post;
      })
      .catch(() => {
        res.status(404).send("No Posts Found");
      });

    await Users.find({})
      .then(async (arrcol) => {
        var user_data = {};
        temp = arrcol.map((i) => {
          user_data[i["_id"].toString()] = {};
          user_data[i["_id"].toString()]["interest"] = i["interest"];
          user_data[i["_id"].toString()]["connections"] = i["connections"];
          user_data[i["_id"].toString()]["following"] = i["following"];
        });
        await Promise.all(temp);

        var user = req.user.user_id,
          dict_users = user_data,
          liked_cat = await liked_categories(),
          category = await posts_category(),
          user_posts = await users_post(user),
          liked_post = await liked_posts(user),
          ps = await score();

        var interest = user_data[user]["interest"],
          connections = user_data[user]["connections"],
          following = user_data[user]["following"];

        user_posts.map((p) => {
          if (ps[p] != undefined) {
            delete ps[p];
          }
        });

        liked_post.map((p) => {
          if (ps[p] != undefined) {
            delete ps[p];
          }
        });

        if (interest != undefined) {
          for (var i in ps) {
            if (interest.includes(category[i])) {
              ps[i] += 50;
            }

            if (liked_cat[user] != undefined) {
              var cat = liked_cat[user];
              if (cat.includes(category[i])) {
                ps[i] += 30 * cat.filter((x) => x === category[i]).length;
              }
            }
          }
        }

        if (connections != undefined) {
          connections.map((i) => {
            var con_interest = dict_users[i]["interest"];
            if (con_interest != undefined) {
              for (var p in ps) {
                if (con_interest.includes(category[p])) {
                  ps[p] += 20;
                }
              }
            }
          });
        }

        if (following != undefined) {
          following.map((i) => {
            var fol_interest = dict_users[i]["interest"];
            if (fol_interest != undefined) {
              for (var p in ps) {
                if (fol_interest.includes(category[p])) {
                  ps[p] += 15;
                }
              }
            }
          });
        }

        var ids = Object.keys(ps);
        var send_data = ids.slice(0, 5);

        feed = send_data.map(async (id) => {
          await Posts.find({ _id: id })
            .populate("user_id", "followers")
            .populate("category")
            .then((data) => {
              result_data = data;
            })
            .catch(() => {
              res.status(400).json({
                success: false,
                msg: "ERR IN FEED DATA",
              });
            });
          return result_data[0];
        });
        feeds = await Promise.all(feed);
        // console.log("FEEDS", feeds);
        res.status(200).json({
          success: true,
          msg: feeds,
          ids: ids.slice(5, ids.length),
        });
      })
      .catch(() => {
        res.status(404).send("Error in Recommendation Data");
      });
  } catch (err) {
    res.status(404).send("Error in Recommendation");
  }
};

exports.sharePost = (req, res) => {
  Posts.findById(req.params.post_id)
    .then((post) => {
      const date = new Date();
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);

      const postDoc = new Posts({
        user_id: req.user.user_id,
        post_title: post.post_title,
        author_name: req.body.author_name,
        post_content: req.params.post_id,
        category: post.category,
        hashtags: post.hashtags,
        media: req.body.media,
        media_tag: post.media_tag,
        post_type: post.post_type,
        published_on: date,
        isShared: true,
      });
      postDoc
        .save()
        .then(() => {
          res.status(200).json({ success: true, msg: "Post created" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ success: false, msg: "error creating the post" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//search autocomplete on port_title
exports.getSearchPostTitle = async (request, response) => {
  try {
    await client.connect();
    collection = client.db("OlcademyCommunity").collection("posts");
    let result = await collection
      .aggregate([
        {
          $search: {
            autocomplete: {
              query: `${request.query.query}`,
              path: "post_title",
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        },
      ])
      .toArray();
    response.send(result);
  } catch (e) {
    console.log(e);
    response.status(500).send({ message: e.message });
  }
};
