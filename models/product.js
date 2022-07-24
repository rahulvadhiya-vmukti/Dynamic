const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
<<<<<<< Updated upstream:models/boxproduct.js
		price: {
			type: String,
		},
		image: {
			type: String,
		},
		description: {
			type: String,
		},
		boxcategory: {
=======
        image: {
			type: String,
		},
		subcategory: {
>>>>>>> Stashed changes:models/product.js
			type: mongoose.Schema.Types.ObjectId,
			ref: "subCategory",
			required: true,
		},
		
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

exports.Product = mongoose.model("Product", productSchema);
