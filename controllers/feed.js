const { validationResult } = require('express-validator');
const fs = require('fs');
const Post = require('../models/post');
exports.getPosts = (req, res, next) => {
    Post
        .find()
        .then(posts => {
            res.status(200).json({
                posts: posts
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, Incorrect data entered!');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    //create post in db
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: {
            name: 'Tony B'
        }
    });
    post.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error(`Couldn't find post`);
                error.statusCode = 404;
                throw error;
            }
            return res.status(200).json({ message: 'Post found.', post: post });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, Incorrect data entered!');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        const error = new Error('No file picked.')
        error.statusCode = 400;
        throw error;
    }

    Post.findById(postId)
        .then(post => {
            if (!post) {
                if (!post) {
                    const error = new Error(`Couldn't find post!`);
                    error.statusCode = 404;
                    throw error;
                }
            }
            post.title = title;
            post.content = content;
            post.imageUrl = imageUrl;
            return post.save();
        })
        .then(result => {
            result.status(200).json({
                message: `${title} updated successfully!`,
                statusCode: 200
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

const clearImage = (req, res, next) => {

}