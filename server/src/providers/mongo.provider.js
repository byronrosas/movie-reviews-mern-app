
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/movierev",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }
)
.then((db)=>{ console.log("DB is connected"); })
.catch((error)=>{ console.log(error); });


mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})