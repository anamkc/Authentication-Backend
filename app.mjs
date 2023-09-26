import connectDb from './connectDb.mjs';
import express from 'express';
import User from './model/model.mjs';
import cors from 'cors'
import signuprouter from './routes/signup.mjs'
import signinrouter from './routes/signin.mjs'
import userdashrouter from './routes/userdash.mjs'
import { validatetoken } from './middleware/validatetoken.mjs';
const app = express();
app.use(cors());


connectDb();
app.use(express.json());
app.get('/', (req,res)=>{
res.send('Hello worls from the server')
})
const middleware = (req,res,next) =>{
    console.log("hello middlewre")
    next();

}
app.get('/about',validatetoken, (req,res)=>{
   console.log(req.body.user)
    const {id,email} = req.body.user;
    res.json({id,email})
    
   
})

//Middleware



app.get('/contact', (req,res)=>{
    res.cookie("anam" , 'khatri');
res.send('Hello worls from the contact')
})
app.use('/signin' , signinrouter)

app.use('/signup', signuprouter)

app.use('/userdash' , validatetoken, userdashrouter )



console.log('Hello worls');
app.listen(3000, ()=> {
    console.log('server is running at port no 3000');
})