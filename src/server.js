// Byron Rosas => Server

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import movieRouter from './routes/movie.route'
import reviewRouter from './routes/review.route'
dotenv.config();


// express app
const app = express();

// white origin list
var whiteList = [
    process.env.CLIENT_URL,
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://localhost:3000'
];

var corsOptionsFunction = (req,callback)=>{
    var opt;
    
    if(whiteList.indexOf(req.header('Origin'))!== -1){
        // opt with origin true => enable CORS for this request
        opt = {
            origin:true
        }
    }else{
        // opt with origin false => disable CORS for this request
        opt = {
            origin:false
        }
    }

    // callback params (error, opt)
    callback(null, opt);
}


// use cors with opt function
app.use(cors(corsOptionsFunction));


app.use(helmet());

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self';  script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self'"
  );
  next();
});
app.use(express.json({limit:"1MB"}));
app.use(express.urlencoded({ limit:"1MB", extended: false }));
app.use(cookieParser());

if (process.env.ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        console.log("running production");
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

// routes
app.use('/API/auth', authRouter);
app.use('/API/movie', movieRouter);
app.use('/API/review', reviewRouter);



//  handle error
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === 'development' ? err : {};

    res.status(err.status || 500);

    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
})

export default app;