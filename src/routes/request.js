const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      console.log("fromUserId", fromUserId);
      console.log("toUserId", toUserId);
      //Checking Valid Status
      const allowedStatus = ["interested", "ignored"];
      const validStatus = allowedStatus.includes(status);
      if (!validStatus) {
        return res.status(400).send({ message: "Invalid Status" });
      }

      //Checking if duplicate connection exists
      const duplicateRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (duplicateRequest) {
        return res.status(400).send({ message: "Request already exists" });
      }

      //const validtoUserId = await User.findOne({ _id: toUserId });
      const validtoUserId = await User.findById(toUserId);
      if (!validtoUserId) {
        return res.status(400).send({ message: "User doesnt exist" });
      }

      if (toUserId === fromUserId) {
        return res.status(400).send({ message: "Can send request to own!" });
      }

      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request Sent Successfully!",
        data,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
  try {
    const loggedInUser = req.user;
    const {status, requestId}=req.params;

    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status not allowed!"});
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id:requestId,
      toUserId: loggedInUser._id,
      status:"interested"
    });

    if(!connectionRequest){
      return res.status(404).json({message:"Connection request not found"})  
    }

    connectionRequest.status=status;
    const data = await connectionRequest.save();
    res.json({message:"Connection request"+status, data})
  }
  catch (error) {
    res.status(400).send("Error: "+ error.message)
    
  }
})
  


  module.exports = requestRouter;
