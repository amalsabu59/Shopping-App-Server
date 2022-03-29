const Cart = require("../models/Cart")
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken")

const router = require("express").Router()


router.post("/",verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err)
    }
})



//UPDATA PRODUCTS
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
  
    try{
        const updatedCart = await User.findByIdAndUpdate(req.params.id,
            {
            $set:req.body
            },
            { new:true } 
        )
        res.status(200).json(updatedCart)
    }catch (err) {
        res.status(500).json(err)
    }
});

//DELETE PRODUCTS
router.delete("/:id",verifyTokenAndAuthorization ,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has  been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});
//GET USER CART
router.get("/find/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.id})
       

        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
});

router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{

    }catch(err){
        req.status(500).json(err)
    }
})



module.exports = router