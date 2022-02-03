//@desc     GET all hospitals
//@routes   GET /api/va/hospitals
//@access   Public
exports.getHospitals = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Show all hospitals'});
};

//@desc     GET single hospitals
//@routes   GET /api/va/hospitals/:id
//@access   Public
exports.getHospital = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show hospital ${req.params.id}`});
};

//@desc     CREATE new hospital
//@routes   POST /api/va/hospitals
//@access   Public
exports.createHospital = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Create new hospital'});
};

//@desc     Update hospital
//@routes   PUT /api/va/hospitals/:id
//@access   Public
exports.updateHospital = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update hospital ${req.params.id}`});
};

//@desc     Delete hospital
//@routes   DELETE /api/va/hospitals/:id
//@access   Public
exports.deleteHospital = (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete hospital ${req.params.id}`});
};