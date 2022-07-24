const express = require("express");
const router = express.Router();


const { Category } = require("../models/category");
const { subCategory } = require("../models/subcategory");
const { Product } = require("../models/product");


const { User } = require("../models/user");
const { Contact } = require("../models/contact");
const { Order } = require("../models/order");
const mongoose = require("mongoose");
const multer = require("multer");
const isAuth = require("../build/is-auth");
const fileHelper = require("../build/file");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({ 
	cloud_name: 'dfsixliv3', 
	api_key: '823464447974964', 
	api_secret: 'Loo3pVEXOqMMU7RnvJwRM5RjZug' 
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


const upload = multer({ storage: storage });

router.get(`/`, isAuth, async (req, res) => {
	const order = await Order.countDocuments();
	const product = await Product.countDocuments();
	const category = await Category.countDocuments();
	const subcategory = await subCategory.countDocuments();
	const user = await User.countDocuments();
	const contact = await Contact.countDocuments();

	res.render("admin/index", {
		orders: order,
		product: product,
		category: category,
		subcategory: subcategory,
		user: user,
		contact: contact,
	});
});




router.get(`/category`, isAuth, async (req, res) => {
	res.render("admin/category");
});


router.post(`/category`, isAuth, async (req, res) => {
	let category = new Category({
		name: req.body.category,
	});

	category = await category.save();

	if (!category)
		res.status(500).send("This category was not sent to database...");

	res.redirect("/admin/category");
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
<<<<<<< Updated upstream
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		logocategory: req.body.logocategory,
=======
		
		category: req.body.category,
>>>>>>> Stashed changes
	});

	subcategory = await subcategory.save();

	if (!subcategory)
		res.status(500).send("This subcategory was not sent to database...");

	res.redirect("/admin/addsubcategory");
});

<<<<<<< Updated upstream
router.post(`/addvideosproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
	
	let videosproduct = new videosProduct({
		name: req.body.name,
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		videoscategory: req.body.videoscategory,
	});
=======
>>>>>>> Stashed changes



router.get("/subcategory", isAuth, async (req, res) => {
	const subcategory = await subCategory.find();

<<<<<<< Updated upstream
router.post(`/addfestivalproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
	
	let festivalproduct = new festivalProduct({
		name: req.body.name,
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		festivalcategory: req.body.festivalcategory,
=======
	res.render("admin/subcategory", {
		subcategory: subcategory,
>>>>>>> Stashed changes
	});
});
<<<<<<< Updated upstream
router.post(`/addvisitingproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
	
	let visitingproduct = new visitingProduct({
		name: req.body.name,
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		visitingcategory: req.body.visitingcategory,
	});

	visitingproduct = await visitingproduct.save();
=======
>>>>>>> Stashed changes


router.get(`/addproduct`, isAuth, async (req, res) => {
	const category = await Category.find().select("name");
	const subcategory = await subCategory.find().select("name");
	res.render("admin/addproduct", { category: category, subcategory: subcategory});
});
<<<<<<< Updated upstream
router.post(`/addbrochureproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
	
	let brochureproduct = new brochureProduct({
		name: req.body.name,
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		brochurecategory: req.body.brochurecategory,
	});
=======
>>>>>>> Stashed changes

router.post(`/addproduct`, isAuth, upload.single("image"), async (req, res) => {
	const fileName = req.file.filename;
	const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;

	let product = new Product({
		name: req.body.name,
<<<<<<< Updated upstream
		price: req.body.price,
		image: `${basePath}${fileName}`,
		description: req.body.description,
		boxcategory: req.body.boxcategory,
	});

	boxproduct = await boxproduct.save();

	if (!boxproduct)
		res.status(500).send("This boxproduct was not sent to database...");

	res.redirect("/admin/addboxproduct");
});







router.get("/logoproduct", isAuth, async (req, res) => {
	const logoproduct = await LogoProduct.find();

	res.render("admin/logoproduct", {
		logoproduct: logoproduct,
	});
});

router.get("/videosproduct", isAuth, async (req, res) => {
	const videosproduct = await videosProduct.find();

	res.render("admin/videosproduct", {
		videosproduct: videosproduct,
	});
});

router.get("/festivalproduct", isAuth, async (req, res) => {
	const festivalproduct = await festivalProduct.find();

	res.render("admin/festivalproduct", {
		festivalproduct: festivalproduct,
	});
});
router.get("/visitingproduct", isAuth, async (req, res) => {
	const visitingproduct = await visitingProduct.find();

	res.render("admin/visitingproduct", {
		visitingproduct: visitingproduct,
	});
});
router.get("/brochureproduct", isAuth, async (req, res) => {
	const brochureproduct = await brochureProduct.find();

	res.render("admin/brochureproduct", {
		brochureproduct: brochureproduct,
	});
});
router.get("/boxproduct", isAuth, async (req, res) => {
	const boxproduct = await boxProduct.find();

	res.render("admin/boxproduct", {
		boxproduct: boxproduct,
	});
});







router.get("/logoproductdetails", isAuth, async (req, res) => {
	const logoproduct = await LogoProduct.findOne({ _id: req.query.id });

	res.render("admin/logoproductdetails", {
		logoproduct: logoproduct,
	});
});

router.get("/videosproductdetails", isAuth, async (req, res) => {
	const videosproduct = await videosProduct.findOne({ _id: req.query.id });

	res.render("admin/videosproductdetails", {
		videosproduct: videosproduct,
=======
		
		image: `${basePath}${fileName}`,
		
		subcategory: req.body.subcategory,
		category: req.body.category,
>>>>>>> Stashed changes
	});

	product = await product.save();

	if (!product)
		res.status(500).send("This product was not sent to database...");

	res.redirect("/admin/addproduct");
});

router.get("/product", isAuth, async (req, res) => {
	const product = await Product.find();

	res.render("admin/product", {
		product: product,
	});
});





router.get("/productdetails", isAuth, async (req, res) => {
	const product = await Product.findOne({ _id: req.query.id });

	res.render("admin/productdetails", {
		product: product,
	});
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
<<<<<<< Updated upstream
router.get("/updatevisitingproduct", isAuth, async (req, res) => {
	const visitingproduct = await visitingProduct.findOne({ _id: req.query.id }).populate(
		"visitingcategory"
	);
	const visitingcategory = await visitingCategory.find().select("name");

	res.render("admin/updatevisitingproduct", {
		visitingcategory: visitingcategory,
		visitingproduct: visitingproduct,
	});
});
router.get("/updatebrochureproduct", isAuth, async (req, res) => {
	const brochureproduct = await brochureProduct.findOne({ _id: req.query.id }).populate(
		"brochurecategory"
	);
	const brochurecategory = await brochureCategory.find().select("name");

	res.render("admin/updatebrochureproduct", {
		brochurecategory: brochurecategory,
		brochureproduct: brochureproduct,
	});
});
router.get("/updateboxproduct", isAuth, async (req, res) => {
	const boxproduct = await boxProduct.findOne({ _id: req.query.id }).populate(
		"boxcategory"
	);
	const boxcategory = await boxCategory.find().select("name");

	res.render("admin/updateboxproduct", {
		boxcategory: boxcategory,
		boxproduct: boxproduct,
	});
});







router.post(
	"/updatelogoproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid logoproduct id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const logoproduct = await LogoProduct.findById(req.params.id);
			imagePath = logoproduct.image;
		}

		const updateLogoProduct = await LogoProduct.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				description: req.body.description,
				logocategory: req.body.logocategory,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/viewlogoproduct");
	}
);


router.post(
	"/updatevideosproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid videosproduct id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const videosproduct = await videosProduct.findById(req.params.id);
			imagePath = videosproduct.image;
		}

		const updatevideosProduct = await videosProduct.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				description: req.body.description,
				videoscategory: req.body.videoscategory,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/viewvideosproduct");
	}
);

router.post(
	"/updatefestivalproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid festivalproduct id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const festivalproduct = await festivalProduct.findById(req.params.id);
			imagePath = festivalproduct.image;
		}

		const updatefestivalProduct = await festivalProduct.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				description: req.body.description,
				festivalcategory: req.body.festivalcategory,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/viewfestivalproduct");
	}
);
router.post(
	"/updatevisitingproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid visitingproduct id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const visitingproduct = await visitingProduct.findById(req.params.id);
			imagePath = visitingproduct.image;
		}

		const updatevisitingProduct = await visitingProduct.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				description: req.body.description,
				visitingcategory: req.body.visitingcategory,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);
=======
>>>>>>> Stashed changes


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
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const product = await Product.findById(req.params.id);
			imagePath = product.image;
		}

		const updateProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
<<<<<<< Updated upstream
				description: req.body.description,
				brochurecategory: req.body.brochurecategory,
=======
				subcategory: req.body.subcategory,
				category: req.body.category,
>>>>>>> Stashed changes
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/product");
	}
);
<<<<<<< Updated upstream
router.post(
	"/updateboxproduct/:id",
	isAuth,
	upload.single("image"),
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).send("Invalid boxproduct id");
		}

		const file = req.file;
		let imagePath;

		if (file) {
			const fileName = req.file.filename;
			const basePath = `https://res.cloudinary.com/dfsixliv3/image/upload/v1657608669/`;
			imagePath = `${basePath}${fileName}`;
		} else {
			const boxproduct = await boxProduct.findById(req.params.id);
			imagePath = boxproduct.image;
		}

		const updateboxProduct = await boxProduct.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				price: req.body.price,
				image: imagePath,
				description: req.body.description,
				boxcategory: req.body.boxcategory,
				updated_at: Date.now(),
			},
			{
				new: true,
			}
		);

		res.redirect("/admin/viewboxproduct");
	}
);


=======
>>>>>>> Stashed changes






<<<<<<< Updated upstream
router.get("deletelogoproduct/:id", async (req, res) => {
	try {
		logoproduct = await LogoProduct.findByIdAndRemove(req.params.id);
		
		// if (logoproduct) {
		// 	fileHelper.deleteFile(`public/${logoproduct.image}`);
		// 	return res.status(200).redirect("/admin/viewlogoproduct");
		// } else {
		// 	return res
		// 		.status(404)
		// 		.json({ success: false, message: "The logoproduct not found" });
		// }
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});


router.get("deletevideosproduct/:id", async (req, res) => {
	try {
		videosproduct = await videosProduct.findByIdAndRemove(req.params.id);

		if (videosproduct) {
			
			fileHelper.deleteFile(`public/${videosproduct.image}`);
			return res.status(200).redirect("/admin/viewvideosproduct");
		} else {
			return res
				.status(404)
				.json({ success: false, message: "The videosproduct not found" });
		}
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});
=======

>>>>>>> Stashed changes

router.get("deleteproduct/:id", isAuth,async (req, res) => {
	try {
		const product = await Product.findByIdAndRemove(req.params.id);
			
		if (product) {
			fileHelper.deleteFile(`public/${product.image}`);
			return res.status(200).redirect("/admin/product");
		} else {
			return res
				.status(404)
				.json({ success: false, message: "The logoproduct not found" });
		}
	} catch (err) {
		return res.status(400).json({ success: false, error: err });
	}
});










router.get(`/mailbox`, isAuth, async (req, res) => {
	const contact = await Contact.find();

	res.render("admin/mailbox", {
		messages: contact,
	});
});

router.get(`/readmail`, isAuth, async (req, res) => {
	const message = await Contact.findOne({ _id: req.query.id });
	const findPath = req.query.path;
	const fileText = req.query.text;
	// message.filePath

	res.render("admin/readmail", {
		message: message,
	});
});

module.exports = router;
