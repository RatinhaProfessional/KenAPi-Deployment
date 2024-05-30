/*
 ----------------------------------------------------------------------------------------
 Endpoints for user routes.
 ----------------------------------------------------------------------------------------
 Here's specified logic for registering new user and log in existing one. Name and email 
 validation against the DB, password hashing and salting.

*/

const router = require("express").Router();
const user = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {regValidation, logValidation} = require('../validation.js')


//POST /api/user/register
router.post("/register", async (req, res) => {
    
    //input validation
    const { error } = regValidation(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }


    //checking if email exists
    const emailRegistered = await user.findOne({email: req.body.email});

    if (emailRegistered) {
        return res.status(400).json({error: "Email already exists"});
    }


    //checking if username exists
    const nameRegistered = await user.findOne({name: req.body.name});

    if (nameRegistered) {
        return res.status(400).json({error: "Name already exists"});
    }


    //password hashing
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);


    //create and save the user
    const userObject = new user ({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObject.save();
        res.json({error: null, data: savedUser._id})
    } catch (error) {
        res.status(400).json({error})
    }
});


//POST /api/user/login
router.post("/login", async (req, res) => {

    //input validation
    const { error } = logValidation(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }


    //checking if login is valid
    const users = await user.findOne({email: req.body.email});

    if (!users) {
        return res.status(400).json({error: "Email not found"});
    }


    //checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, users.password)

    if(!validPassword) {
        return res.status(400).json({error: "Wrong Password"});
    }


    //token creation
    const token = jwt.sign
    (
        {
            name: users.name,
            id: users._id
        },

        process.env.TOKEN_SECRET,
        {expiresIn:  process.env.JWT_EXPIRES_IN}
    )


    //token attachment
    res.header("auth-token", token).json({
        error: null,
        data: {token}
    })

});

module.exports = router;