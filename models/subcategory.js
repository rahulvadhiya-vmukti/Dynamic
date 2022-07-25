const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
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

exports.subCategory = mongoose.model("subCategory", subcategorySchema);
