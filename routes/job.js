//  const { Router } = require('express')
let express=require('express')
let router=express.Router();

let Job=require('../models/job-db.js');

//middlewares
const { isLoggedIn,isAdmin }=require('../middlewares/index.js');

//landing page
router.get('/',(req,res)=>{
    res.render('jobs/landing');
})

//index page
router.get('/jobs',async (req,res)=>{
    try {
        let foundJobs=await Job.find({});
        res.render('jobs/index',{foundJobs})
    } catch (error) {
        console.log('error in index page',error);
    }
})

//new page
router.get('/jobs/new',isLoggedIn,isAdmin,(req,res)=>{
    res.render('jobs/new')
})

//create
router.post('/jobs', async (req,res)=>{
    try {
        // make db obj
        let newJob=new Job({
            name:req.body.name,
            address:req.body.address,
            image:req.body.image
        });
        await newJob.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log('error in creating jobs',error)
    }
})
//show page
router.get('/jobs/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let showjob=await Job.findById(id);
        res.render('jobs/show',{showjob});
    } catch (error) {
        console.log('error in show page',error);
    }
})

//edit page
router.get('/jobs/:id/edit',isLoggedIn,isAdmin,async (req,res)=>{
    let id=req.params.id;
    let editjobs=await Job.findById(id);
    res.render('jobs/edit',{editjobs});
})

//update page
router.patch('/jobs/:id',async (req,res)=>{
    try {
        let id=req.params.id;
        let updateobj={
            name:req.body.name,
            address:req.body.address,
            image:req.body.image
        }
        await Job.findByIdAndUpdate(id,updateobj);
        res.redirect(`/jobs/${id}`);

    } catch (error) {
        console.log('error in update',error);
    }
})

//delete page
router.delete('/jobs/:id',isLoggedIn,isAdmin,async (req,res)=>{
    try {
        let id=req.params.id;
        await Job.findByIdAndDelete(id);
        res.redirect(`/jobs`)
        
    } catch (error) {
        console.log('error in delete');
    }
})


module.exports=router;