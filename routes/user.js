let express=require('express')
let router=express.Router();
let user_db=require('../models/auth-db');
let {loggedIn,isAdmin, isLoggedIn}=require('../middlewares/index')

//show page
router.get('/user/:id',async(req,res)=>{
    try {
        let user=await user_db.findById(req.params.id);
        res.render('user/show',{user});
    } catch (error) {
        res.send('error in user show',error);
    }
})
//edit
router.get('/user/:id/edit',isLoggedIn,async (req,res)=>{
    try {
        let id=req.params.id;
        let user=await user_db.findById(id);
        res.render('user/edit',{user});
    } catch (error) {
        res.send('error in edit user',error);
    }
})
// update
router.patch('/user/:id', isLoggedIn, async (req, res) => {
	try {
		await user_db.findByIdAndUpdate(req.params.id, req.body.user);
		res.redirect(`/user/${req.params.id}`);
	} catch (error) {
		console.log('problem while updating user', error);
	}
});
// delete
router.delete('/user/:id', isLoggedIn, async (req, res) => {
	try {
		await user_db.findByIdAndDelete(req.params.id);
		res.redirect(`/user/${req.params.id}`);
	} catch (error) {
		console.log('problem while deleting user', error);
	}
});


module.exports=router;