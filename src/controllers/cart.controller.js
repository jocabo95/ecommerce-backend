import * as service from '../services/cart.services.js'

export const getAll = async(req, res)=>{
  try {
    const cartList = await service.getAll()
    res.status(200).json(cartList)
  } catch (error) {
    console.log(error);
  }
}

export const create = async(req, res)=>{
  try {
    const newCart = await service.create()
    if (!newCart) res.status(404).json({ msg: "Error create cart!" });
    else res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
  }
}

export const getCartById = async(req, res)=>{
  try {
    const{id}=req.params
    const selectedCart = await service.getCartById(id)
    if (!selectedCart) res.status(404).json({ msg: "Cart Not found!" });
    else res.status(200).json(selectedCart);
  } catch (error) {
    console.log(error);
  }
}

export const updateCart = async(req, res) =>{
  try {
    const {cartId}= req.params
    
    const updatedCart = await service.updateCart(cartId, req.body)

    if(!updatedCart) res.status(404).json({msg: 'could not update cart'})
    else res.status(200).json(updatedCart)
  } catch (error) {
    console.log(error);
  }
}

export const removeCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCart = await service.remove(id);
    if (!deletedCart) res.status(404).json({ msg: "could not delete cart" });
    else res.status(200).json({ msg: `Cart id: ${id} deleted` });
  } catch (error) {
    console.log(error);
  }
};

export const addProdToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;

    const product = await service.addProdToCart(cartId, prodId);
    console.log('cartId= ', cartId);
    if (!product) res.json({ msg: "couldnt add product to cart" });
    else res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const removeProdFromCart = async(req, res)=>{
  try {
    const {cartId}=req.params
    const {prodId}=req.params
    
    const newCart = await service.removeProdFromCart(cartId, prodId)

    if(!newCart) res.json({msg: 'Could not delete product form cart'});
    else res.status(200).json({ msg: `product ${prodId} deleted from cart` });
  } catch (error) {
    console.log(error);
  }
}

export const updateQuantity = async(req, res) =>{
  try {
    const {cartId} = req.params;
    const {prodId} = req.params
    const {quantity} = req.body

    const newCart = await service.updateQuantity(cartId, prodId, quantity);

    console.log('cartid: ', cartId);
    console.log('prodid: ', prodId);
    console.log('req.body: ', req.body);
    if (!newCart) res.json({ msg: `Could not modify product (${prodId}) quantity` });
    else res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
  }
}

export const clearCart = async(req, res) =>{
  try {
    const { cartId } = req.params;
    const newCart = await service.clearCart(cartId)
    if (!newCart)
      res.json({ msg: `Could not clear cart` });
    else res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
  }
}