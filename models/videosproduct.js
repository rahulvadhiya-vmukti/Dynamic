const mongoose = require("mongoose");

const videosproductSchema = mongoose.Schema(
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
		videoscategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "videosCategory",
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

exports.videosProduct = mongoose.model("videosProduct", videosproductSchema);
