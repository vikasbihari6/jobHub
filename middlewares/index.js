//authentication
const isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        console.log('you are not logged in');
        res.redirect('/login');
    }
}
//autherization
const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        return res.send('you do not have permission to do than');
    }
}

module.exports={
    isLoggedIn,
    isAdmin
}