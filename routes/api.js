const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from db
router.get('/ninjas', function(req, res, next){
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lng)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function(ninjas){
        res.send(ninjas);
    });
});

// add a new ninja to db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

// update a ninja in db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findOneAndUpdate(_id=req.params.id, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        })
    });
});

// delete a ninja in db
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findOneAndRemove(_id=req.params.id).then(function(ninja){
        res.send(ninja)
    });
});

module.exports = router;