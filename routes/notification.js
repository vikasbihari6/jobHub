let express=require('express');
let router=express.Router();

let notif_db=require('../models/notif-db')

//index page
router.get('/notification',async (req,res)=>{
    try {
        let foundNotif=await notif_db.find({});

        res.render('notification/index',({foundNotif}))
    } catch (error) {
        res.send('error while show the notif');
    }
})
//new
router.get('/notification/new',(req,res)=>{
    res.render('notification/new')
})
//create
router.post('/notification',async (req,res)=>{
    try {
        let newNotif=new notif_db({
            body:req.body.body,
            author:req.body.author
        })
        await newNotif.save();
        res.redirect('/notification');
    } catch (error) {
        res.send('error while creating form')
    }
})
//delete

//now i don't know about from where id comes
router.delete('/notification/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        await notif_db.findByIdAndDelete(id);
        res.redirect('/notification')
    } catch (error) {
        return res.send('error while deleting',error)
    }
})
module.exports=router;