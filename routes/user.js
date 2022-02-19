const router = require("express").Router();

router.get("/usertest", (req,res)=>{
    res.send("user test passed, boi");
})

router.post("/userposttest", (req,res)=>{
    const username = req.body.username;
    res.send("you are: " + username)
})

module.exports = router