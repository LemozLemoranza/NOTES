const {Router} = require('express')
const router = Router();

router.get('/', (req, res)=>{
    res.send('TODO OK')
})


module.exports = router