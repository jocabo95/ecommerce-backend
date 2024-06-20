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
    const { idCart } = req.params;
    const { idProd } = req.params;

    const product = await service.addProdToCart(idCart, idProd);
    if (!product) res.json({ msg: "couldnt add product to cart" });
    else res.json(product);
  } catch (error) {
    console.log(error);
  }
};
