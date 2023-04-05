let mongoose=require('mongoose')
let passportlocalmongoose=require('passport-local-mongoose')

let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin: {
		type: Boolean,
		default: false
	},
	name: String,
	cgpa: Number,
	selected: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportlocalmongoose,{usernamefield:'username'});
let User=mongoose.model('user',userSchema);

module.exports=User;
