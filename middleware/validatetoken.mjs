import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()
export const validatetoken = (req,res,next)=>{
    let mytoken
    const token = req.headers.authorization 
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      if (!token.startsWith("Bearer")) {
        return res.status(403).send("Invalid Token");
      }
      try {
        mytoken = token.split(" ")[1]
        const decoded = jwt.verify(mytoken, process.env.JWT_SECRET);
        req.body.user = decoded;
        console.log(decoded)
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}