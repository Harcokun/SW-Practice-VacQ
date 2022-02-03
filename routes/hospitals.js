const express = require('express');
const router = express.Router();

//Test localhost:5000
/*router.get('/', (req, res) => {
    //res.send('<h1>Hello from express</h1>');
    //res.send({name: 'Brad'});
    //res.json({name: 'Brad'});
    //res.sendStatus(400);
    //res.status(400).json({success: false});
    res.status(200).json({success: true, data: {id: 1}});
});
*/

router.get('/', (req, res) => {
    res.status(200).json({success: true, msg: 'Show all hospitals'});
});

router.get('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Show all hospitals ${req.params.id}`});
});

router.post('/', (req, res) => {
    res.status(200).json({success: true, msg: 'Create new hospital'});
});

router.put('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Update hospital ${req.params.id}`});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({success: true, msg: `Delete hospital ${req.params.id}`});
});

module.exports = router;