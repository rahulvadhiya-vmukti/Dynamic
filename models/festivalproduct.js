const mongoose = require("mongoose");

const festivalproductSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		price: {
			type: String,
		},
		image: {
			type: String,
		},
		description: {
			type: String,
		},
		festivalcategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "festivalCategory",
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

exports.festivalProduct = mongoose.model("festivalProduct", festivalproductSchema);
