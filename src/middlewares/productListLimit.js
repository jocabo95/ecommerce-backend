import fs from 'fs'

export const checkLimit = async (req, res, next)=>{
  
  const {limit} = req.query
  const products = await fs.promises.readFile()

  if(limit > req.body.length)
}