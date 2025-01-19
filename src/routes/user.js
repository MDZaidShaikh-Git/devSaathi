const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const user = require("../models/user")
const ConnectionRequestModel = require("../models/connectionRequest");
const { set } = require("mongoose");
const user_data = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", user_data);

    res.json({
      message: "Data fetched Successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", user_data)
      .populate("toUserId", user_data);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ message: "Data fetched successfully", data: data });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// userRouter.get("/user/feed", userAuth, async(req,res)=>{
//   try {

//     const loggedInUser = req.user;
//     const connectionRequests = await connectionRequest.find({
//       $or:[{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}]
//     }).select("fromUserId toUserId") 
    
//     const hideUsersFromFeed = new Set();

//     connectionRequests.forEach(element => {
//       hideUsersFromFeed.add(element.fromUserId.toString());
//       hideUsersFromFeed.add(element.toUserId.toString())
      
//     });

//     const usersInFeed = await user.find(
//       {
//         $and:[
//         {_id:{$nin: Array.from(hideUsersFromFeed )}},
//         {_id:{$ne: loggedInUser._id}}
//         ]
//       }
//     ).select(user_data)
    
//     res.send(usersInFeed)
//   } catch (err) {
//     res.status(400).json({message: err.message})
//   }
// })

userRouter.get("/user/feed", userAuth, async(req, res)=>{
  try {

    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit)||10;
    limit = limit>50?50:limit;
    const skip= (page-1)*10;

    const connectionRequests = await connectionRequest.find({
      $or:[
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
      ]
    }).select("fromUserId toUserId")

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((element)=>{
      hideUsersFromFeed.add(element.fromUserId.toString());
      hideUsersFromFeed.add(element.toUserId.toString())
    })
    
    const usersInFeed= await user.find({
      $and:[
        {_id:{$nin: Array.from(hideUsersFromFeed)}},
        {_id:{$ne: loggedInUser._id}}

      ]
    }).select(user_data).skip(skip).limit(limit)

    res.send(usersInFeed)
  } catch (err) {
    res.status(400).json({message: err.message})
    
  }  
})
module.exports = userRouter;
