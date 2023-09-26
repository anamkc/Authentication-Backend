import User from "../model/model.mjs"
import bcrypt from"bcrypt"
export const registeruser = async (req,res)=>{
  console.log(req.body);
    const body = req.body;
   const{name,work,phone,email,password,cpassword} = body
   if(!name || !work || !phone || !email || !password || !cpassword){
     return res.send({error:"fill the form "})
   }
   try{
   const userExist = await User.findOne({email:email})
   if(userExist){
    return res.send({error:"user already exist"});
            }
            else if(password != cpassword ){
              res.send({message:"password are not matching"})
            } else{
              const hashedpassword = await bcrypt.hash(password,12);
              console.log(hashedpassword)
               const newUser = new User({
                   name,
                   work,
                   phone,
                   email,
                   password:hashedpassword,
                   cpassword:hashedpassword,
                  
                 
                 });
                 const registerUser = await newUser.save();
                 if(registerUser){
                  return res.send({message:"user registered successfully" , success:"true"})
                 } else {
                   return res.send({error:"registered user failed"}).status(500);
                 }
            }
           

             } 
        
   
   catch(err) {
    console.log(err);
   }
   
  
    
}



/*
export const registeruser =  (req,res)=>{
    console.log(req.body);
      const body = req.body;
     const{name,work,phone,email,password,cpassword} = body
     if(!name || !work || !phone || !email || !password || !cpassword){
       return res.json({error:"fill the form "})
     }
     User.findOne({email:email})
      .then((userExist)=>{
          if(userExist){
  return res.json({error:"user already exist"});
          }
          const newUser = new User({
              name,
              work,
              phone,
              email,
              password,
              cpassword,
             
            
            });
            newUser.save().then(()=>{
              res.json({message:"user registered successfully"})
            }) .catch((err)=>res.status(500).json({error:"failed registering user"}))
      }) .catch(()=>{console.log(err);})
     
    
        res.json({ message: "success" }).status(200); 
  } */