export const validateProduct = (req, res, next) => {
  if (
    req.body.title === undefined ||
    req.body.description === undefined ||
    req.body.code === undefined ||
    req.body.price === undefined ||
    req.body.stock === undefined ||
    req.body.category === undefined
  ) {
    res.status(404).json({ error: "invalid product info" });
  } else {
    next();
  }
};
