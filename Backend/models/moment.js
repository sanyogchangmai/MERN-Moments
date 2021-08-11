const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const momentSchema = new Schema({
    user_uid: {
        type: String
    },
    img_url: {
        type: String
    },
    description: {
        type: String
    },
}, {timestamps: true});

const Moment = mongoose.model("Moment",momentSchema);

module.exports = Moment;