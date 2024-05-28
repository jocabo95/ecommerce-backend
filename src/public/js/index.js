const socket = io();

// fn used in id="deleteProd-button"
let deleteProduct = (prodId) => {
  socket.emit("deleteProduct", prodId);
};

// recieve all products
socket.on("productList", (productList) => {
  const productListHtml = productList.map((el) => {
    return `
        <div class="product-card">
          <h3><b>Title: </b>${el.title}</h3>
          <h3><b>ID: </b>${el.id}</h3>
          <p><b>Descritpion: </b>${el.description}</p>
          <p><b>Category: </b>${el.catgory}</p>
          <p><b>Price: </b>${el.price}</p>
          <p><b>Stock: </b>${el.stock}</p>
          <p><b>Code: </b>${el.code}</p>
          <br>
          <button id="deleteProd-button" onclick="deleteProduct('${el.id}')">Delete</button>
        </div>
      `;
  });

  let productCardList = productListHtml.join(" ")

  document.getElementById('products-container').innerHTML= productCardList
});

// create product
document.getElementById('form').addEventListener("submit",(e)=>{
  e.preventDefault()

  const productData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    code: document.getElementById('code').value,
    stock: document.getElementById('stock').value,
  }

  socket.emit('addProduct', (productData))
})

