let express=require('express');
const passport = require('passport');
let router=express.Router();

let auth_db=require('../models/auth-db.js');

router.get('/register',(req,res)=>{
    res.render('auth/register');
})
router.post('/register',async (req,res)=>{
    // console.log(req.body.username);
    let newuser=new auth_db({
        username:req.body.username
    });
    //hashing salting and saving
    let registerUser=await auth_db.register(newuser,req.body.password);
    //saved user is not logged in
    //coockie atomatically generate
    req.login(registerUser,(error)=>{
        if(error){
            res.send('error while resister');
        }
        res.redirect('/jobs');
    });

});

router.get('/login',(req,res)=>{
    res.render('auth/login');
})


router.post('/login',passport.authenticate('local', {failureRedirect: '/login'}),(req,res)=>{
    res.redirect('/jobs');
})

router.get('/logout',(req,res)=>{
    try {
        res.redirect('/jobs');
    } catch (error) {
        res.send('error while log out')
    }
})

module.exports=router;