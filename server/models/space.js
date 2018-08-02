const mongoose = require('mongoose');
const { Schema } = mongoose;

const spaceSchema = mongoose.Schema({
    //TODO: are key and createdAt needed?
    name: {
        type: String,
        required: true,
    },
    isDeleted: { 
        type: Boolean,
        //TODO: is default needed?
        default: false,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    description: String,
    categories: [Schema.Types.ObjectId],
    homePageId: {
        type: Schema.Types.ObjectId,
        // TODO: ask what is this. is required?
        // required: true,
    },
    blogId: Schema.Types.ObjectId,
    pages: [Schema.Types.ObjectId],
    history:[Schema.Types.ObjectId],
    rights: {
        users: [Schema.Types.ObjectId],
        groups: [Schema.Types.ObjectId],
        anonymous: {
            type: Schema.Types.ObjectId,
            //TODO: is default needed?
            default: null,
        },
    },
});
const SpaceModel = mongoose.model('Space', spaceSchema);

module.exports = SpaceModel;
