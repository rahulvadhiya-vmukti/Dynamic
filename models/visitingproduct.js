const mongoose = require("mongoose");

const visitingproductSchema = mongoose.Schema(
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
		visitingcategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "visitingCategory",
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

exports.visitingProduct = mongoose.model("visitingProduct", visitingproductSchema);
