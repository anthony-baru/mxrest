const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/Game of Thrones TV Series Wallpapers Set-13 [Spy1984] (8).jpg',
            creator: {
                name: 'Tony B'
            },
            createdAt: new Date()
        }]
    })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ message: 'Validation failed, Incorrect data entered!', errors: errors.array() })
    }
    const title = req.body.title;
    const content = req.body.content;
    //create post in db
    res.status(200).json({
        message: 'Post created successfully!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Tony B'
            },
            createdAt: new Date()
        }
    })
}