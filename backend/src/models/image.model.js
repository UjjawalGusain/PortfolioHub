import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const imageSchema = new Schema({
    imageFile: {
        type: String, // cloudinary
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
})

imageSchema.plugin(mongooseAggregatePaginate)

export const Image = mongoose.model("Image", imageSchema)