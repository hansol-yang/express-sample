const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        msg: 'Fetch all posts api'
    })
})

module.exports = router;