let Userdb = require('../model/model');
const { body }= require("express-validator");

// create and save new user
exports.create = (req,res)=>{
    
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

   
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
        
    })
//     body("name")
//     .exists()
//     .withMessage("Name is required")
//     .isString()
//     .withMessage("Name should be string"),
//   body("email").isEmail().withMessage("Provide valid email"),
//   body("gender")
//     .isIn(["Male", "Female"])
//     .withMessage("Gender value is invalid"),
//   body("status")
//     .isIn(["Active", "Inactive"])
//     .withMessage("Status value is invalid")
  
    user
        .save(user)
        .then(data => {
            //res.send(data)
            //res.json(data);
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// exports.find=(req,res,next)=>{
//     if(req.query.page && req.query.limit){
//         Userdb.paginate({},{page: req.query.page,limit:req.query.limit})
//     .then(response=>{
//         res.json({
//             response
//         })
//     })
//     .catch(error=>{
//         res.json({
//             message:"An error occured:" +error
//         })
//     })
//     }else{
//         Userdb.find()
//     .then(user=>{
//         res.send(user)
//     })
//     .catch(err=>{
//         res.status(500).send({message:err.message|| "error occured while retriving info"})
//     })


exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}