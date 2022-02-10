const Hospital = require('../models/Hospital.js');

//@desc     GET all hospitals
//@routes   GET /api/va/hospitals
//@access   Public
exports.getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({success: true, count: hospitals.length, data: hospitals});
    } 
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     GET single hospitals
//@routes   GET /api/va/hospitals/:id
//@access   Public
exports.getHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, data: hospital});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     CREATE new hospital
//@routes   POST /api/va/hospitals
//@access   Public
exports.createHospital = async (req, res, next) => {
    
    /*console.log(req.body);
    res.status(200).json({success: true, msg: 'Create new hospital'});*/
    
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
        success: true,
        data: hospital
    });
};

//@desc     Update hospital
//@routes   PUT /api/va/hospitals/:id
//@access   Public
exports.updateHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if(!hospital) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: hospital});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     Delete hospital
//@routes   DELETE /api/va/hospitals/:id
//@access   Public
exports.deleteHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        
        if(!hospital) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: {}});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};