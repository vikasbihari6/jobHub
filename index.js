let express=require('express')
let app=express()
const mongoose=require('mongoose');
const path=require('path')
const session=require('express-session')
const passport=require('passport')
const localStrategy=require('passport-local')
app.set('view engine','ejs');
app.use(express.urlencoded());
let methodOverride=require('method-override');
app.use(methodOverride('_method'));
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.60ujjaa.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log('db connected');
    })
    .catch((error)=>{
        console.log(error);
    })

//for css file
app.use(express.static(__dirname + '/public'));

let userRoutes=require('./routes/auth.js')
let auth_db=require('./models/auth-db')
app.use(
	session({
		secret: 'SuperSecretPasswordForHireHub',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			expires: Date.now() + 1000 * 60 * 60 * 24,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);
// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(auth_db.authenticate()));
passport.serializeUser(auth_db.serializeUser());
passport.deserializeUser(auth_db.deserializeUser());

app.use((req, res, next)=> {
	res.locals.currentUser = req.user;
	// res.locals.moment = moment;
	// res.locals.error = req.flash('error');
	// res.locals.success = req.flash('success');
	next();
});

app.use(userRoutes)
let jobRoutes=require('./routes/job.js')
app.use(jobRoutes);

let notifRoutes=require('./routes/notification.js')
app.use(notifRoutes);
let user_Routes=require('./routes/user.js')
app.use(user_Routes);


app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
})