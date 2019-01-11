var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    _id: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    created_by: {
        type: String
    },
    edited_by: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    tags: {
        type: Array
    },
    hidden: {
        type: Boolean
    },
    app_id: {
        type: String
    }
},
    { collection: 'entries' });

EntrySchema.index({ '$**': 'text' });

module.exports = mongoose.model('BlogEntry', EntrySchema);