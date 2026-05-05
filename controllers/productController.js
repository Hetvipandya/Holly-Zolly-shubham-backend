const Product = require('../models/Product');

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const {
      categoryId,
      productName,
      price,
      rating,
      image,
      isActive,
      description
    } = req.body;

    if (!categoryId || !productName || !price || !image || !description) {
      return res.status(400).json({ message: 'All required fields missing' });
    }

    const product = new Product({
      categoryId,
      productName,
      price,
      rating,
      image,
      isActive,
      description
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.log('CREATE PRODUCT ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categoryId', 'name');

    res.status(200).json(products);

  } catch (error) {
    console.log('GET PRODUCTS ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // આ ચેક કરશે કે શું ID ડેટાબેઝમાં છે, ભલે તે String હોય કે ObjectId
    const product = await Product.findOne({ _id: id })
      .populate('categoryId', 'name');

    if (!product) {
      console.log(`Product with ID ${id} not found in DB`);
      return res.status(404).json({ message: 'Product not found in Database' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('SERVER ERROR:', error.message);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.log('UPDATE PRODUCT ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => { 
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.log('DELETE PRODUCT ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};