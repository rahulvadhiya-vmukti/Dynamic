const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { User } = require("../models/user");

const mongoose = require("mongoose");
const multer = require("multer");
const { Product } = require("../models/product");
const { subCategory } = require("../models/subcategory");
const { Category } = require("../models/category");
var nodemailer = require('nodemailer');
const apiKey = process.env.API_KEY;


router.get(`/`, async (req, res) => {
	// const product = await Product.find().limit(8);
	const category = await Category.find();
    // const subcategory = await subCategory.find().select("name");
	res.render("home", {
		// product: product,
        // subcategory: subcategory,
		category: category,
		cart: req.session.cart,
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
	});
});




router.get("/index",  async (req, res) => {
	const category = await Category.findOne({ _id: req.query.id });
	const subcategory = await subCategory.find({ category: category });
	const product = await Product.find({subcategory:subcategory})
	res.render("index", {
		category: category,
		subcategory: subcategory,
		product: product
	});
 console.log(subcategory);
 console.log(product);
});


router.get(`/:name`, async (req, res, next) => {
	const pathName = req.params.name;
	const subcategoryId = await subCategory.findOne({ name: pathName });
	
	if (!subcategoryId) {
		next();
		
	} 
    else {
		const subcategory = await subCategory.find().select("name");
        // const subcategory = await subCategory.find({ category: categoryId._id });
		const product = await Product.find({subcategory: subcategoryId._id});
		
		
		res.render("index2", {
            subcategoryname: req.params.name,
			// category: category,
            subcategory: subcategory,
			product:product,
          
			cart: req.session.cart,
			sessionId: req.session._id,
			anAdmin: req.session.anAdmin,
			pathName: pathName,
			
		});
		console.log(product)
        
	}
    
});


router.get(`/contact`, async (req, res) => {
	// const logocategory = await LogoCategory.find().select("name");

	res.render("contact", {
		cart: req.session.cart,
		sessionId: req.session._id,
		anAdmin: req.session.anAdmin,
		// logocategory: logocategory,
	});
});

router.post("/contact", (req,res)=>{
	var mailContent = {
		name: req.body.name,
		email: req.body.email,
		subject: req.body.subject,
		phone: req.body.phone,
		message: req.body.message
	}
  
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: 'trendswalls@gmail.com',
		  pass: 'uwvpyibraqjavhvs',
		}
	});
  
	var mailOptions = {
		from: mailContent.email,
		to: 'trendswalls@gmail.com',
		subject: mailContent.subject,
		// subject: "mailContent.subject",
		text: mailContent.name + " sent you a message : \n" + JSON.stringify(mailContent.message) + "\n Subject: " + mailContent.subject + "\n Email id: " + mailContent.email + "\n Phone no: " + mailContent.phone 
	  };
  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		  res.redirect("/contact");
		}
	  });  
  
	  transporter.close();
	  
  });
  


// router.get(`/logoproduct`, async (req, res) => {
// 	const logoproduct = await LogoProduct.find();

// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("logoproduct", {
// 		logoproduct: logoproduct,
// 		logocategory: logocategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "logoproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });

// router.get(`/index2`, async (req, res) => {
// 	const videosproduct = await videosProduct.find().limit(8);
// 	const videoscategory = await videosCategory.find().select("name");

// 	res.render("index2", {
// 		videosproduct: videosproduct,
// 		videoscategory: videoscategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 	});
// });
// router.get(`/index3`, async (req, res) => {
// 	const festivalproduct = await festivalProduct.find().limit(8);
// 	const festivalcategory = await festivalCategory.find().select("name");

// 	res.render("index3", {
// 		festivalproduct: festivalproduct,
// 		festivalcategory: festivalcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 	});
// });
// router.get(`/index4`, async (req, res) => {
// 	const visitingproduct = await visitingProduct.find().limit(8);
// 	const visitingcategory = await visitingCategory.find().select("name");

// 	res.render("index4", {
// 		visitingproduct: visitingproduct,
// 		visitingcategory: visitingcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 	});
// });
// router.get(`/index5`, async (req, res) => {
// 	const brochureproduct = await brochureProduct.find().limit(8);
// 	const brochurecategory = await brochureCategory.find().select("name");

// 	res.render("index5", {
// 		brochureproduct: brochureproduct,
// 		brochurecategory: brochurecategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 	});
// });
// router.get(`/index6`, async (req, res) => {
// 	const boxproduct = await boxProduct.find().limit(8);
// 	const boxcategory = await boxCategory.find().select("name");

// 	res.render("index6", {
// 		boxproduct: boxproduct,
// 		boxcategory: boxcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 	});
// });






// router.get(`/blog`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("blog", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.get(`/blogdetail`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("blogdetail", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.get(`/about`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("about", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.get(`/contact`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("contact", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.post(`/contact`, async (req, res) => {
// 	let contactMsg = new Contact({
// 		username: req.body.username,
// 		email: req.body.email,
// 		subject: req.body.subject,
// 		message: req.body.message,
// 	});

// 	contactMsg = await contactMsg.save();

// 	if (!contactMsg) res.status(500).send("The contact message was not saved");

// 	res.redirect("/contact");
// });





// router.get(`/logoproduct`, async (req, res) => {
// 	const logoproduct = await LogoProduct.find();

// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("logoproduct", {
// 		logoproduct: logoproduct,
// 		logocategory: logocategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "logoproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });

// router.get(`/videosproduct`, async (req, res) => {
// 	const videosproduct = await videosProduct.find();

// 	const videoscategory = await videosCategory.find().select("name");

// 	res.render("videosproduct", {
// 		videosproduct: videosproduct,
// 		videoscategory: videoscategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "videosproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });
// router.get(`/festivalproduct`, async (req, res) => {
// 	const festivalproduct = await festivalProduct.find();

// 	const festivalcategory = await festivalCategory.find().select("name");

// 	res.render("festivalproduct", {
// 		festivalproduct: festivalproduct,
// 		festivalcategory: festivalcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "festivalproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });
// router.get(`/visitingproduct`, async (req, res) => {
// 	const visitingproduct = await visitingProduct.find();

// 	const visitingcategory = await visitingCategory.find().select("name");

// 	res.render("visitingproduct", {
// 		visitingproduct: visitingproduct,
// 		visitingcategory: visitingcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "visitingproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });
// router.get(`/brochureproduct`, async (req, res) => {
// 	const brochureproduct = await brochureProduct.find();

// 	const brochurecategory = await brochureCategory.find().select("name");

// 	res.render("brochureproduct", {
// 		brochureproduct: brochureproduct,
// 		brochurecategory: brochurecategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "brochureproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });
// router.get(`/boxproduct`, async (req, res) => {
// 	const boxproduct = await boxProduct.find();

// 	const boxcategory = await boxCategory.find().select("name");

// 	res.render("boxproduct", {
// 		boxproduct: boxproduct,
// 		boxcategory: boxcategory,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		pathName: "boxproduct",
// 		val:'',
// 		// price: '',
// 		// color: '',
// 		// tags: '',
// 		sortby: ''
// 	});
// });




// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const logocategoryId = await LogoCategory.findOne({ name: pathName });
// 	if (!logocategoryId) {
// 		next();
// 	} else {
// 		const logocategory = await LogoCategory.find().select("name");
// 		const logoproduct = await LogoProduct.find({ logocategory: logocategoryId._id });

// 		res.render("logoproduct", {
// 			logoproduct: logoproduct,
// 			logocategory: logocategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });
// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const videoscategoryId = await videosCategory.findOne({ name: pathName });
// 	if (!videoscategoryId) {
// 		next();
// 	} else {
// 		const videoscategory = await videosCategory.find().select("name");
// 		const videosproduct = await videosProduct.find({ videoscategory: videoscategoryId._id });

// 		res.render("videosproduct", {
// 			videosproduct: videosproduct,
// 			videoscategory: videoscategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });
// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const festivalcategoryId = await festivalCategory.findOne({ name: pathName });
// 	if (!festivalcategoryId) {
// 		next();
// 	} else {
// 		const festivalcategory = await festivalCategory.find().select("name");
// 		const festivalproduct = await festivalProduct.find({ festivalcategory: festivalcategoryId._id });

// 		res.render("festivalproduct", {
// 			festivalproduct: festivalproduct,
// 			festivalcategory: festivalcategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });
// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const visitingcategoryId = await visitingCategory.findOne({ name: pathName });
// 	if (!visitingcategoryId) {
// 		next();
// 	} else {
// 		const visitingcategory = await visitingCategory.find().select("name");
// 		const visitingproduct = await visitingProduct.find({ visitingcategory: visitingcategoryId._id });

// 		res.render("visitingproduct", {
// 			visitingproduct: visitingproduct,
// 			visitingcategory: visitingcategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });
// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const brochurecategoryId = await brochureCategory.findOne({ name: pathName });
// 	if (!brochurecategoryId) {
// 		next();
// 	} else {
// 		const brochurecategory = await brochureCategory.find().select("name");
// 		const brochureproduct = await brochureProduct.find({ brochurecategory: brochurecategoryId._id });

// 		res.render("brochureproduct", {
// 			brochureproduct: brochureproduct,
// 			brochurecategory: brochurecategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });
// router.get(`/:name`, async (req, res, next) => {
// 	const pathName = req.params.name;
// 	const boxcategoryId = await boxCategory.findOne({ name: pathName });
// 	if (!boxcategoryId) {
// 		next();
// 	} else {
// 		const boxcategory = await boxCategory.find().select("name");
// 		const boxproduct = await boxProduct.find({ boxcategory: boxcategoryId._id });

// 		res.render("boxproduct", {
// 			boxproduct: boxproduct,
// 			boxcategory: boxcategory,
// 			cart: req.session.cart,
// 			sessionId: req.session._id,
// 			anAdmin: req.session.anAdmin,
// 			pathName: pathName,
// 			val:'',
// 			// price: '',
// 			// color: '',
// 			// tags: '',
// 			sortby: ''
// 		});
// 	}
// });








// router.get(`/logoproductdetail`, async (req, res) => {
// 	const logoproduct = await LogoProduct.findById(req.query.id).populate("logocategory");
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("logoproductdetail", {
// 		logoproduct: logoproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.get(`/videosproductdetail`, async (req, res) => {
// 	const videosproduct = await videosProduct.findById(req.query.id).populate("videoscategory");
// 	const videoscategory = await videosCategory.find().select("name");

// 	res.render("videosproductdetail", {
// 		videosproduct: videosproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		videoscategory: videoscategory,
// 	});
// });

// router.get(`/festivalproductdetail`, async (req, res) => {
// 	const festivalproduct = await festivalProduct.findById(req.query.id).populate("festivalcategory");
// 	const festivalcategory = await festivalCategory.find().select("name");

// 	res.render("festivalproductdetail", {
// 		festivalproduct: festivalproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		festivalcategory: festivalcategory,
// 	});
// });
// router.get(`/visitingproductdetail`, async (req, res) => {
// 	const visitingproduct = await visitingProduct.findById(req.query.id).populate("visitingcategory");
// 	const visitingcategory = await visitingCategory.find().select("name");

// 	res.render("visitingproductdetail", {
// 		visitingproduct: visitingproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		visitingcategory: visitingcategory,
// 	});
// });
// router.get(`/brochureproductdetail`, async (req, res) => {
// 	const brochureproduct = await brochureProduct.findById(req.query.id).populate("brochurecategory");
// 	const brochurecategory = await brochureCategory.find().select("name");

// 	res.render("brochureproductdetail", {
// 		brochureproduct: brochureproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		brochurecategory: brochurecategory,
// 	});
// });
// router.get(`/boxproductdetail`, async (req, res) => {
// 	const boxproduct = await boxProduct.findById(req.query.id).populate("boxcategory");
// 	const boxcategory = await boxCategory.find().select("name");

// 	res.render("boxproductdetail", {
// 		boxproduct: boxproduct,
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		boxcategory: boxcategory,
// 	});
// });






// router.get(`/carthandler`, async (req, res) => {
// 	const cart = {
// 		id: req.query.id,
// 		name: req.query.name,
// 		price: req.query.price,
// 		image: req.query.image,
// 		quantity: req.query.quantity,
// 	};

// 	if (req.session.cart) {
// 		if (req.session.cart.find((item) => item.name === req.query.name)) {
// 			console.log("Item is already saved...");
// 		} else {
// 			req.session.cart.push(cart);
// 		}
// 	} else {
// 		req.session.cart = [];
// 		req.session.cart.push(cart);
// 	}

// 	res.redirect("/logoproduct");
// });

// router.get(`/cart`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("cart", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.post(`/removecart`, async (req, res) => {
// 	const savedCart = req.session.cart;
// 	const item = savedCart.find((item) => item.name === req.body.name);
// 	req.session.cart = savedCart.filter((value) => value !== item);

// 	res.redirect("cart");
// });

// router.post(`/updatecart`, async (req, res) => {
// 	req.session.cart.forEach((item) => {
// 		if (item.id === req.body.id) {
// 			item.quantity = req.body.quantity;
// 		}
// 	});
// 	req.session.save();

// 	res.redirect("cart");
// });

// router.get(`/login`, async (req, res) => {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("login", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 	});
// });

// router.get(`/logout`, async (req, res) => {
// 	req.session.destroy();
// 	res.redirect("/");
// });

// router.post("/signup", async (req, res) => {
// 	let user = new User({
// 		username: req.body.username,
// 		email: req.body.email,
// 		password: req.body.password,
// 		phonenumber: req.body.phonenumber,
// 	});

// 	user = await user.save();

// 	if (!user) res.status(400).send("The data cannot be saved");

// 	res.redirect("/login");
// });

// router.post("/signin", async (req, res) => {
// 	let user = await User.findOne({ email: req.body.email });

// 	if (!user) return res.status(400).send("This user is not Registered");

// 	if (user && user.password === req.body.password) {
// 		req.session._id = user._id;
// 		req.session.anAdmin = user.isAdmin;
// 		return req.session.save((err) => {
// 			res.redirect("/");
// 		});
// 	} else {
// 		res.redirect("/login");
// 	}
// });

// router.get("/checkout", async (req, res) => {
// 	// if (!req.session._id) {
// 	//     res.redirect('/login')
// 	// } else {
// 	const logocategory = await LogoCategory.find().select("name");

// 	res.render("checkout", {
// 		cart: req.session.cart,
// 		sessionId: req.session._id,
// 		anAdmin: req.session.anAdmin,
// 		logocategory: logocategory,
// 		apiKey: apiKey
// 	});
// 	// }
// });

// router.post("/orderhandler", async (req, res) => {
// 	const orderItemsIds = Promise.all(
// 		req.session.cart.map(async (savedCart) => {
// 			let orderDetail = new OrderDetail({
// 				quantity: savedCart.quantity,
// 				logoproduct: savedCart.id,
// 			});

// 			orderDetail = await orderDetail.save();

// 			return orderDetail._id;
// 		})
// 	);

// 	const orderItemsIdsResolve = await orderItemsIds;

// 	let order = new Order({
// 		orderItems: orderItemsIdsResolve,
// 		userId: req.body.userId,
// 		address: req.body.address,
// 		state_country: req.body.state_country,
// 		city_zipcode: req.body.city_zipcode,
// 		phone: req.body.phone,
// 		total: req.body.total,
// 	});

// 	order = await order.save();

// 	if (!order) return res.status(400).send("The order was not completed");

// 	res.redirect("/");
// });

// router.get("/aggregation", (req, res) => {
// 	res.render("searchmailbox");
// });

// router.get("/ssss", async (req, res) => {
// 	let store = await Store.find();

// 	res.send(store);
// });

// router.post("/ssss", async (req, res) => {
// 	let arr = req.body.keyword.split(",");
// 	let array = req.body.coordinate.split(",");
// 	let store = new Store({
// 		address: {
// 			name: req.body.name,
// 			state: req.body.state,
// 			keyword: arr,
// 			country: req.body.country,
// 			location: {
// 				coordinate: array,
// 			},
// 		},
// 		// username: req.body.username,
// 		// email: req.body.email,
// 		// password: req.body.password,
// 		// phonenumber: req.body.phonenumber
// 	});

// 	store = await store.save();

// 	if (!store) res.status(400).send("The data cannot be saved");

// 	res.send(store);
// 	// res.redirect('/login')
// });

module.exports = router;
