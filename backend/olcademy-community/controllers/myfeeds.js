const Posts=require("../models/post");
const ObjectId=require("mongodb").ObjectID;
const Users = require('../models/user');
const Comments=require('../models/comment');

var  r = [];
var result_id
var report_threshold=0 // change the 
var temp
var temp_post
var feed = []
var feeds
var result_data

exports.getRecommendation = async(req, res) => {  //this is the function which needs to be called to get the recommendation 
	await Users.find({ _id: req.user.user_id})
	.then(async (user)=>{
		// console.log("USER", user);
	    if(user[0].connections.length>0) //in this case if the user has a connection only then it will be going through this to get connection high
	    {
	    	c=user[0].connections
	    	r = c.map(async (conn) => {   
		        post_id = conn;
		        // console.log("POST ID", post_id);
		        await Posts.find({'user_id':post_id, post_type: req.params.post_type})
		        .then((posts)=>{
		            
		            temp = posts.map(async (post) =>
		            {   report=post.spam+post.copyright_issue+post.inappropriate_content+post.harassment+post.other
		                value=100
		                ap=Math.abs(new Date() - post.published_on)/ 86400000; //divide by the number of days so that best and recent one will be at the top 
		                az=Math.floor(ap)
		                pla=az+1
		                if(pla<3){
		                    if(report<report_threshold)
		                    {
		                    value=value-pla;}
		                    else{
		                        value=value-pla-report}
		                    }
		                
		                else{
		                    if(report<report_threshold)
		                    {lk=pla*10;
		                    value=value-lk;}
		                    else{lk=pla*10;
		                        value=value-lk-report;
		                        
		                        
		                    }
		                }
		                
		                result_id = [post._id,value,post.user_id,az];
		                return result_id;
		                // r.push([post[j]._id,value,post[j].user_id,az])
		                
		         	}) //console.log(r) 
		        })
		        .catch(() => {
		        	res.status(400).json({
						success: false,
						msg: "ERR IN FEED CONNECTION" 
					});
		        });
		        temp_post = await Promise.all(temp);
		        return temp_post;
	    	})
		}
		if(user[0].following.length>0)
	    {   
	        c=user[0].following
	        r = c.map(async (conn) => {
	            follower=50
	            post_id=conn
	            // console.log(post_id)
	            await Posts.find({ post_type: req.params.post_type })
	            .then((posts)=>{
	            	// for(j=0;j<post.length;j++)
	                temp = posts.map(async (post) => {
		                if(post.user_id==us_id)
		                {  if(r.indexOf(post._id) == -1){
		                    value=value-post.published_on
		                    report=post.spam+post.copyright_issue+post.inappropriate_content+post.harassment+post.other
		                    value=value-report

		                    result_id = [post._id,value,post.user_id];
		                    return result_id 
		                    // r.push([post[j]._id,value,post[j].user_id])
		                  
		                   // r.push([post[i]._id,20])
		                    //console.log(r)
		                }}
		                else
		                {
		                    if(r[0].indexOf(post._id) == -1){
		                        views=2;
		                        likes=4;
		                        comment=6;
		                        share=10;
		                        bookmarks=8;
		                        notifications=7;
		                        report=post.spam+post.copyright_issue+post.inappropriate_content+post.harassment+post.other
		                        ps=Date.now()
		                       ///console.log(a[i].comments)
		                       if(report>report_threshold){
		                            l=post.num_of_views*views+post.notifications.length*notifications+post.likes.length*likes+post.bookmarks.length*bookmarks//+post[j].comments*comment
		                       }
		                       else{
		                        l=post.num_of_views*views+post.notifications.length*notifications+post.likes.length*likes+post.bookmarks.length*bookmarks//+post[j].comments*comment
		                       }
		                            ap=Math.abs(new Date() - post.published_on)/ 86400000;
		                            az=Math.floor(ap)
		                            az=az+1
		                            pla=l/az
		                            //post_id,total,number of days 
		                            result_id = [post._id,pla,az];
		                            return result_id
		                            //r.push([post[j].id,pla,az])
		                    }
		                }
		                temp_post = await Promise.all(temp);
		                return temp_post;
	                }) //console.log(r)
	            })
	            .catch(() => {
	            	res.status(400).json({
						success: false,
						msg: "ERR IN FEED FOLLOWING1" 
					});
	            });
	        })
	    }
	    if(user[0].following.length<=0 || user[0].connections.length<=0){
            await Posts.find({ post_type: req.params.post_type })
            .then(async (posts) => {
            	// console.log("POSTS", posts);
                temp = posts.map(async (post) => {
				    views=2;
				    likes=4;
				    comment=6;
				    share=10;
				    bookmarks=8;
				    notifications=7;
				    report=post.spam+post.copyright_issue+post.inappropriate_content+post.harassment+post.other
				    ps=Date.now()
				   //console.log(report)
				   if(report>report_threshold){
					    l=post.num_of_views*views+post.notifications.length*notifications+post.likes.length*likes+post.bookmarks.length*bookmarks//+post[j].comments*comment
						l=l=report
					}
					else{
						l=post.num_of_views*views+post.notifications.length*notifications+post.likes.length*likes+post.bookmarks.length*bookmarks//+post[j].comments*comment
					}

			        ap=Math.abs(new Date() - post.published_on)/ 86400000;
			        az=Math.floor(ap)
			        az=az+1
			        pla=l/az
			        //post_id,total,number of days 
			        result_id = [post._id,pla,az];
		            return result_id;
                })
                temp_post = await Promise.all(temp);
		        r.push(temp_post);  
            })
            .catch(() => {
            	res.status(400).json({
					success: false,
					msg: "ERR IN FEED FOLLOWING2" 
				});
            });   
        }
        const ids = await Promise.all(r);
        // console.log("IDS", ids[0]);
        var send_data = ids[0].slice(0, 10);
        // console.log("SEND", send_data);
        feed = send_data.map(async (id) => {
        	// console.log("SLICE", id[0]);
			await Posts.find({ '_id': id[0] })
			.populate("user_id", "followers")
			.then((data) => {
				result_data = data
				// console.log("DATA", value)
			})
			.catch(() => {
				res.status(400).json({
					success: false,
					msg: "ERR IN FEED DATA" 
				});
			})
			return result_data[0];
		});
		feeds = await Promise.all(feed); 
		// console.log("FEEDS", feeds);
		res.status(200).json({
			success: true,
			msg: feeds,
			ids: ids[0].slice(10, ids[0].length)
		});
	})
	.catch((err) => {
		 console.log("FEED", err);
		res.status(400).json({
			success: false,
			msg: "ERR IN FEED" 
		});
	});
	// console.log("Feeds", r);
}

exports.getFeeds = async(req, res) => {
	try {
		feed = req.query.data.map(async (id) => {
	    	// console.log("SLICE", id[0]);
			await Posts.find({ '_id': id })
			.populate("user_id", "followers")
			.then((data) => {
				result_data = data
				// console.log("DATA", value)
			})
			.catch(() => {
				res.status(400).json({
					success: false,
					msg: "ERR IN FEED DATA" 
				});
			})
			return result_data[0];
		});
		feeds = await Promise.all(feed); 
		// console.log("FEEDS", feeds);
		res.status(200).json({
			success: true,
			msg: feeds,
		});
	} catch {
		res.status(400).json({
			success: false,
			msg: "No Feeds",
		});
	}
}