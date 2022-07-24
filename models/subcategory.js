const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
<<<<<<< Updated upstream:models/logoproduct.js
		price: {
			type: String,
		},
		image: {
			type: String,
		},
		description: {
			type: String,
		},
		logocategory: {
=======
		
		category: {
>>>>>>> Stashed changes:models/subcategory.js
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

exports.subCategory = mongoose.model("subCategory", subcategorySchema);
