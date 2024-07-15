import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    repoId: {
        type: String, // Github API
        required: true,
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
        enum: ['Web Development', 'Android Development', 'Machine learning', 'Deep Learning', 'Blockchain', 'Cyber Security', 'IOT', 'Other'],
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