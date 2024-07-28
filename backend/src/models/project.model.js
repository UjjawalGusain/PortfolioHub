import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    repoId: {
        type: String, // Github API
    },
    thumbnail: {
        type: String,
    },
    images: [
        {
            type: String,
        }
    ],
    videos: [
        {
            type: String,
        }
    ],
    url: {
        type: String, // Github API
        required: true,
    },
    description: {
        type: String,
    },
    domain: {
        type: String,
    },
    techStack: [
        {
            type: String,
        }
    ],
    stars: {
        type: Number,
        default: 0,
    }, 
    owners: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
    ]
}, {
    timestamps: true,
})

projectSchema.plugin(mongooseAggregatePaginate)

export const Project = mongoose.model("Project", projectSchema) 