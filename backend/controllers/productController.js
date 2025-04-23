const Product = require('../models/ProductSchema');

// @desc    Add a new product
// @route   POST /upload
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, featured, image, sizes, colors, tags } = req.body;

    // Parse sizes if provided as a string
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
      } catch (err) {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    }

    // Parse colors if provided as a string
    let parsedColors = [];
    if (colors) {
      try {
        parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors;
      } catch (err) {
        return res.status(400).json({ message: "Invalid colors format" });
      }
    }

    // Parse tags if provided as a string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (err) {
        return res.status(400).json({ message: "Invalid tags format" });
      }
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      featured: featured === "true",
      image,
      sizes: parsedSizes,
      colors: parsedColors,
      tags: parsedTags
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

// @desc    Get all products
// @route   GET /all
exports.getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Add search filter
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    
    // Add category filter
    if (category) {
      query.category = category;
    }
    
    const skip = (page - 1) * limit;
    const products = await Product.find(query).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(query);
    
    res.json({ products, total });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc    Delete a product by ID
// @route   DELETE /delete/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Attempting to delete product with ID:", id);
   
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      console.log("Product not found for deletion with ID:", id);
      return res.status(404).json({ message: "Product not found" });
    }
   
    console.log("Successfully deleted product:", deleted);
    res.json({ message: "Product deleted", product: deleted });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// @desc    Update a product by ID
// @route   PUT /update/:id
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, featured, colors } = req.body;

    // Parse colors if provided as a JSON string
    let parsedColors = [];
    if (colors) {
      try {
        parsedColors = JSON.parse(colors);
      } catch (err) {
        console.error("Error parsing colors:", err);
        return res.status(400).json({ message: "Invalid colors format" });
      }
    }

    const updatedData = {
      name,
      description,
      price,
      category,
      stock,
      featured: featured === 'true',
      colors: parsedColors, // Update colors
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// @desc    Get a single product by ID
// @route   GET /:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};


exports.getProductsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const products = await Product.find({ tags: tag });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found with this tag" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};