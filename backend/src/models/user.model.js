import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    githubId: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profilePic: {
        type: String, // cloudinary
    },
    watchList: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Project",
        }
    ],
    coverImg: {
        type: String, // cloudinary
    },
    techStack: [
        {
            type: String,
        }
    ],
    domains: [
        {
            type: String,
        }
    ],
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    refreshToken: {
        type: String
    },
    description: {
        type: String
    },
    position: {
        type: String,
        enum: [
            "Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
            "Data Analyst",
            "Data Scientist",
            "DevOps Engineer",
            "Product Manager",
            "UI/UX Designer",
            "AI Engineer",
            "ML Engineer",
            "Software Engineer",
            "QA Engineer",
            "Security Specialist",
            "Mobile Developer",
            "Cloud Engineer",
            "Systems Architect",
            "Database Administrator",
            "Network Engineer",
            "IT Support Specialist",
            "Business Analyst",
            "Scrum Master",
            "Technical Writer",
            "Solutions Architect",
            "Hardware Engineer",
            "Site Reliability Engineer",
            "Cybersecurity Analyst",
            "IT Manager",
            "Project Coordinator",
            "Systems Analyst",
            "Technical Support Engineer"
        ],
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}
 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id, 
        email: this.email,
        username: this.username,
    }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)

