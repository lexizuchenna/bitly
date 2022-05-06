const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }) 
        console.log('MONGODB Connected...')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB