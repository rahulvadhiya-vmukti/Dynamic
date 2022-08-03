const express = require("express");
const router = express.Router();


const { Category } = require("../models/category");
const { subCategory } = require("../models/subcategory");
const { Product } = require("../models/product");


const { User } = require("../models/user");
const { Contact } = require("../models/contact");

const mongoose = require("mongoose");
const multer = require("multer");
const isAuth = require("../build/is-auth");
const fileHelper = require("../build/file");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({ 
	cloud_name: 'alliance2701', 
	api_key: '188895954541616', 
	api_secret: 'Dic2Qj-TNUbkuWnhjAR6uBhU2-0' 
  });

const fileTypeMap = {
	"image/png": "png",
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
};


const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
	  folder: "upload",
	  allowedFormats: 'auto',
      resource_type: 'auto',
	},

  });
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		const isValid = fileTypeMap[file.mimetype];
// 		let uploadError = new Error("Invalid image type");

// 		if (isValid) {
// 			uploadError = null;
// 		}
// 		cb(uploadError, "public/uploads");
// 	},
// 	filename: function (req, file, cb) {
// 		const fileName = file.originalname.replaceAll(" ", "-").split(".");
// 		fileName.pop();
// 		const extension = fileTypeMap[file.mimetype];
// 		cb(null, `${fileName}-${Date.now()}.${extension}`);
// 	},
// });


const upload = multer({ 
	storage: storage,
 });

router.get(`/`, isAuth, async (req, res) => {
	// const order = await Order.countDocuments();
	const product = await Product.countDocuments();
	const category = await Category.countDocuments();
	const subcategory = await subCategory.countDocuments();
	const user = await User.countDocuments();
	const contact = await Contact.countDocuments();

	res.render("admin/index", {
		// orders: order,
		product: product,
		category: category,
		subcategory: subcategory,
		user: user,
		contact: contact,
	});
});





router.get(`/category`, isAuth, async (req, res) => {
	const category = await Category.find();
	
	res.render("admin/category", {
		category: category,
	});
});

router.get(`/addcategory`, isAuth, async (req, res) => {

	res.render("admin/addcategory", );
});


router.post(`/addcategory`, upload.single("image"),isAuth, async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/alliance2701/image/upload/v1658992130/`;
	
	let category = new Category({
		name: req.body.name,
		image: `${basePath}${fileName}`,
	});

	category = await category.save();

	if (!category)
		res.status(500).send("This category was not sent to database...");

	res.redirect("/admin/addcategory");
});


router.get("/updatecategory", isAuth, async (req, res) => {
	const category = await Category.findOne({ _id: req.query.id }).populate(
		// "subcategory","product"
	);
	// const subcategory = await subCategory.find().select("name");
	// const product = await Product.find().select("name");

	res.render("admin/updatecategory", {
		// subcategory: subcategory,
		category: category,
		// product: product,
	});
});







router.get("/subcategory", isAuth, async (req, res) => {
	const subcategory = await subCategory.find();

	res.render("admin/subcategory", {
		subcategory: subcategory,
	});
});

router.get(`/addsubcategory`, isAuth, async (req, res) => {
	const category = await Category.find().select("name");

	res.render("admin/addsubcategory", { category: category });
});


router.post(`/addsubcategory`, isAuth,  async (req, res) => {
	// const fileName = req.file.filename;
	// const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
	
	let subcategory = new subCategory({
		name: req.body.name,
		
		category: req.body.category,
	});

	subcategory = await subcategory.save();

	if (!subcategory)
		res.status(500).send("This subcategory was not sent to database...");

	res.redirect("/admin/addsubcategory");
});


router.get("/updatesubcategory", isAuth, async (req, res) => {
	const subcategory = await subCategory.findOne({ _id: req.query.id }).populate(
		"category"
	);
	
	const category = await Category.find().select("name");

	res.render("admin/updatesubcategory", {
		subcategory: subcategory,
		category: category,
		
	});
});



router.get("/product", isAuth, async (req, res) => {
	const product = await Product.find();

	res.render("admin/product", {
		product: product,
	});
});

router.get(`/addproduct`, isAuth, async (req, res) => {
	const category = await Category.find().select("name");
	const subcategory = await subCategory.find().select("name");
	res.render("admin/addproduct", { category: category, subcategory: subcategory});
});

router.post(`/addproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/alliance2701/image/upload/v1658992130/`;

	let product = new Product({
		name: req.body.name,
		
		image: `${basePath}${fileName}`,
		
		subcategory: req.body.subcategory,
		category: req.body.category,
	});

	product = await product.save();

	if (!product)
		res.status(500).send("This product was not sent to database...");

	res.redirect("/admin/addproduct");
});


router.get("/updateproduct", isAuth, async (req, res) => {
	const product = await Product.findOne({ _id: req.query.id }).populate(
		"subcategory","category"
	);
	const subcategory = await subCategory.find().select("name");
	const category = await Category.find().select("name");

	res.render("admin/updateproduct", {
		subcategory: subcategory,
		category: category,
		product: product,
	});
});





router.get("/productdetails", isAuth, async (req, res) => {
	const product = await Product.findOne({ _id: req.query.id });

	res.render("admin/productdetails", {
		product: product,
	});
});









router.post(
	"/updateproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid product id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/alliance2701/image/upload/v1658992130/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const product = await Product.findById(req.params.id);
			imagePath = product.image;
		}

		const updateProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				// price: req.body.price,
				image: imagePath,
				subcategory: req.body.subcategory,
				category: req.body.category,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/product");
	}
);


router.post(
	"/updatecategory/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid Category id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/alliance2701/image/upload/v1658992130/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const category = await Category.findById(req.params.id);
			imagePath = category.image;
		}

		const updateCategory = await Category.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				// price: req.body.price,
				image: imagePath,
				subcategory: req.body.subcategory,
				product: req.body.product,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/category");
	}
);





router.get("/deletecategory/:id", isAuth,async (req, res) => {
	
		const category = await Category.findByIdAndRemove(req.params.id);
			console.log("Removed")
		if (category) {
			await cloudinary.v2.uploader.destroy(`${category.image}`);
			await category.remove()
			// fileHelper.deleteFile(`public/${product.image}`);
			return res.status(200).redirect("/admin/category");
		} else {
			return res
				.status(404)
				.json({ success: false, message: "The Category not found" });
		}

		
});












module.exports = router;
