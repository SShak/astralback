const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Auth register route for security
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// Login auth route for security

//TODO Server crashes when incorect info is put in.  (can't set header after they are sent to the client)
//not sure if this is just a postman issue.  It seems to crash due to res.status().json("");  res.status removed for now

router.post('/login', async (req, res) => {
  try{
      const user = await User.findOne(
          {
              username: req.body.username
          }
      );
         
      if (!user) return res.status(400).json("Wrong User Name");

      const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
      );


      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;
      
      if (originalPassword != inputPassword) return res.status(400).json("Wrong password");

      const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );

      const { password, ...others } = user._doc;  
      res.status(200).json({...others, accessToken});

  }catch(err){
      res.status(500).json(err);
  }

});

module.exports = router
