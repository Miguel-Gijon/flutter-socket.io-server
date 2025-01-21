const bcrypt = require('bcryptjs');
const { response } = require("express");
const { validationResult } = require("express-validator");
const { validate } = require("uuid");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                message: 'The email is already registered'
            });
        }

        //Cojemos los datos del body y los guardamos en una constante user
        const user = User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user in DB
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);
        
        res.json({ 
            ok: true,
            user: user,
            token
        });
        // Create user
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please talk to the administrator'
        });
    }
}


const login = async (req, res = response) => {

    const { email, password } = req.body;
    try{
        
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'Email not found'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password not valid'
            });
        }

        // Generate JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please talk to the administrator'
        });
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generate JWT
    const token = await generateJWT(uid);

    // Get user by UID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user: user,
        token
    });
}


module.exports = {
    createUser,
    login,
    renewToken
}