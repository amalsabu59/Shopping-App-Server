const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productsRoute = require("./routes/products")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/orders")
const stripeRoute = require("./routes/stripe")
const paymentRoutes = require("./routes/razorpay")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB Connected Succesfully !"))
.catch((err)=>console.log(err))


app.use(express.json())
app.use(cors())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/products",productsRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/checkout",stripeRoute)
app.use("/api/payment",paymentRoutes);


app.listen(process.env.PORT || 8800, ()=> {
    console.log("backend server is running !") 
});