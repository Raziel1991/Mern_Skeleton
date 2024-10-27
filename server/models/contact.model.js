import mongoose from "mongoose"
const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: 'Fist name is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: "Last name is required"
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is reuqired'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        unique: true
    }
})

export default mongoose.model('Contact', ContactSchema);