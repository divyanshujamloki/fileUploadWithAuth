const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/user")

const {
    validateName,
    validateEmail,
    validatePassword
} = require("../util/Validator");


router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, issellor } = req.body;
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(403).json({ err: 'user Already exist ' });

        }
        if (!validateName(name)) {
            
             return res.status(400).json({ err: "Name fails " });
        }
        
      
        if (!validateEmail(email)) {
          return res.status(400).json({ err: "email fails " });
        }

        if (!validatePassword(password)) {
          return res.status(400).json({ err: "pass fails " });
        }

        const hashpass = await bcrypt.hash(password, (saltOrRounds = 10));;
        const user = {
            email,
            name,
            issellor,
            password: hashpass
        };

        const createdUser = await User.create(user);

        return res.status(201).json({
            message:`welcome ${createdUser.name}`,
        })

    } catch (e) {
        console.log("invalid Signup", e);
        return res.status(500).send(e);
    }
    
})

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; 
    const existingUser = await User.findOne({ where: { email } });
    if (email.length === 0) {
      return res.status(400).json({ err: "Please enter your email" });
    }
    if (password.length === 0) {
      return res.status(400).json({ err: "Please enter your password" });
    }

   
    if (!existingUser) {
      return res.status(404).json("Error: User not found");
    }

   
      const passwordMatched = await bcrypt.compare(
          password,
          existingUser.password
     
      );

    if (!passwordMatched) {
      return res.status(400).send("Error: Incorrect password");
    }

    const payload = { user: { id: existingUser.dataValues.id } };
    const bearerToken = await jwt.sign(payload, "SECRET", {
      expiresIn: 360000,
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    console.log("Logged in successfully");

    return res
      .status(200)
      .json({ message: "Signed In Successfully!", bearerToken: bearerToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});


router.post("/signout", async (req, res)=> {
    try{
        
        res.clearCookie('t');
        return res.status(200).json({
            msg:"cookie clear "
        })


    }catch(e) {
        console.log("signout fail", e);
    }
})


module.exports = router;