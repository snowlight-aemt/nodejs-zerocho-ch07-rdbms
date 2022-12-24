const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            commenter: req.body.id,
            created_at: new Date(),
        });

        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.update({
            comment: req.body.comment,
        }, {
            where: { id: req.params.id, },
        });
        
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.destroy({
            where: { id: req.params.id, },
        });
        
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;