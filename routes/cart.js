const Cart = require("../models/Cart");
const products = require("../models/Products");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.body.userId });
    if (existingCart) {
      existingCart.products = req.body.products;
      const savedCart = await existingCart.save();
      res.status(200).json(savedCart);
    } else {
      const newCart = new Cart(req.body);
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATA PRODUCTS
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCTS
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has  been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userid", async (req, res) => {
  try {
    let productsArr = [];
    const carts = await Cart.find({ userId: req.params.userid });
    const cartLength = carts[0].products.length;
    for (let i = 0; i < cartLength; i++) {
      let product = await products.find({
        _id: carts[0].products[i].ProductId,
      });
      productsArr.push({
        quantity: carts[0].products[i].quantity,
        _id: product[0]._id,
        categories: product[0].categories,
        size: product[0].size,
        color: product[0].color,
        inStock: product[0].inStock,
        title: product[0].title,
        image: product[0].image,
        price: product[0].price,
        rating: product[0].rating,
        createdAt: product[0].createdAt,
        updatedAt: product[0].updatedAt,
      });
    }

    const totalPrice = productsArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);

    res.status(200).json({
      products: productsArr,
      totalPrice,
      totalQuantity: productsArr.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
