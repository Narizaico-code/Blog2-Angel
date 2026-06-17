import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    course:{
        type :String,
        require: true
    },
    authorName: {
        type: String,
        default: "Elmer Santos"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
