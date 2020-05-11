exports.getPosts = (req, res, next) => {
    res.status(200).json({ posts: 25 })
}

exports.postPost = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    //create post in db
    res.status(200).json({
        message: 'Post created successfully!',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content
        }
    })
}