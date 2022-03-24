const Hospital = require('../models/Hospital.js');
const vacCenter = require('../models/VacCenter.js');

//@desc     GET all hospitals
//@routes   GET /api/va/hospitals
//@access   Public
exports.getHospitals = async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(req.query);

    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);
        
    //Finding resource
    query = Hospital.find(JSON.parse(queryStr)).populate('appointments');

    //Select Fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('-createAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Hospital.countDocuments();
    //console.log(startIndex, page, limit);

    query = query.skip(startIndex).limit(limit);

    try {
        //Executing query
        const hospitals = await query;

        //Pagination result
        const pagination = {};

        if(endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        res.status(200).json({success: true, count: hospitals.length, pagination, data: hospitals});
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
        const hospital = await Hospital.findById(req.params.id);
        
        if(!hospital) {
            return res.status(400).json({
                success: false,
                message: `Bootcamp not found with id of ${req.params.id}`});
        }

        hospital.remove();
        res.status(200).json({success: true, data: {}});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     Get vaccine centers
//@route    GET /api/v1/hospitals/vacCenters/
//@access   Public
exports.getVacCenters = (req, res, next) => {
    console.log('Reached getVaccenters');
    vacCenter.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving Vaccine Centers.'
            });
        else res.send(data);
    });
};