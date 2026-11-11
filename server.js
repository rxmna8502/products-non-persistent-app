import express from "express";

const app = express();

// middleware
app.use(express.json());

const products = [];

// ================= CRUD =================

// Create a new product - POST http://localhost:4000/products
// payload: {id: 1, name: "laptop", price: 50000}
app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
});

// Read all products - GET http://localhost:4000/products
app.get("/products", (req, res) => {
  res.status(200).json({
    message: "All products fetched successfully",
    data: products,
  });
});

// Read a product by ID - GET http://localhost:4000/products/:id
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((prod) => prod.id === productId);

  if (product) {
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

// Update a product by ID - PUT http://localhost:4000/products/:id
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((prod) => prod.id === productId);

  if (index !== -1) {
    products[index] = { ...products[index], ...req.body, id: productId };
    res.status(200).json({
      message: "Product updated successfully",
      data: products[index],
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

// Delete a product by ID - DELETE http://localhost:4000/products/:id
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((prod) => prod.id === productId);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct[0],
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});