const mongoose=require("mongoose");
const mongoosePaginate=require('mongoose-paginate-v2')
var validateEmail = function(email) {
    var re =/^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+).([a-z A-Z]{2,6})$/
    return re.test(email)
};
var validateName= function(name) {
    var reg =/^[a-z A-Z \. ]*$/
    return reg.test(name)
};


var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:2,
        maxlength:30,
        validate: [validateName, 'Please fill a valid name'],
            match:[/^[a-z A-Z \. ]*$/, 'Please fill a valid name']
        
        
     },
    
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match:[/^([a-z A-Z 0-9 \._]+)@([a-z A-Z]+).([a-z A-Z]{2,6})$/, 'Please fill a valid email address']
        
        /*type:String,
        required:true,
        unique:true*/
        
    },
    gender:{
       type: String,
       required:true,
       validate:{
        validator:function(val){
            let condition=(val=="Male" || val=="Female")
            return condition;
        }

       }
 },
    status:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                let condition=(val=="Active" || val=="Inactive")
                return condition;
            }
    
           } 
    }  
    
})

schema.plugin(mongoosePaginate)
const Userdb=mongoose.model('userdb',schema)
module.exports=Userdb;