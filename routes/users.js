const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: { id: req.params.id, },
            },
        });

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
        });
    
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;