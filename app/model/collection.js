'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var collectionSchema = new Schema({
    id: ObjectId,
    title: String,
    name: {
        type: String, unique: true
    },
    dek: String,
    content: String,
    authors: [{
        type:ObjectId,
        ref:"User"
    }],
    primaryasset:{
        type:ObjectId,
        ref:"Asset"
    },
    createdat: {
        type: Date,
        "default": Date.now
    },
    updatedat: {
        type: Date,
        "default": Date.now
    },
    posts :[{
        order: Number,
        post:{
	        type:ObjectId,
	        ref:"Post"
	    }
    }],
    attributes: Schema.Types.Mixed,
    random: Number
});

collectionSchema.pre('save',function(next,done){
    // var badname = new RegExp(/\badmin\b|\bconfig\b|\bprofile\b|\bindex\b|\bcreate\b|\bdelete\b|\bdestroy\b|\bedit\b|\btrue\b|\bfalse\b|\bupdate\b|\blogin\b|\blogut\b|\bdestroy\b|\bwelcome\b|\bdashboard\b/i);
    // if(this.name !== undefined && this.name.length <4){
    //     done(new Error('title is too short'));
    // } else if(this.name !== undefined && badname.test(this.name) ){
    //     done(new Error('Invalid title'));
    // }
    next();
});

collectionSchema.post('init', function (doc) {
    console.log("model - post.js - "+doc._id+' has been initialized from the db');
});
collectionSchema.post('validate', function (doc) {
    console.log("model - post.js - "+doc._id+' has been validated (but not saved yet)');
});
collectionSchema.post('save', function (doc) {
    // this.db.models.Post.emit('created', this);
    console.log("model - post.js - "+doc._id+' has been saved');
});
collectionSchema.post('remove', function (doc) {
    console.log("model - post.js - "+doc._id+' has been removed');
});

collectionSchema.statics.getRandomWorkout = function(options,callback){
    var self = this;
    // queryHelper.getRandomDocument({model:self},callback);
};

module.exports = collectionSchema;