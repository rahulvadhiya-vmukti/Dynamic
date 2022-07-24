const mongoose = require("mongoose");

const brochureproductSchema = mongoose.Schema(
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
		brochurecategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "brochureCategory",
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

exports.brochureProduct = mongoose.model("brochureProduct", brochureproductSchema);
