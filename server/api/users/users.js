'use strict';

module.exports = function (oApp) {

    let User = require('../../db/models/user.js');

    oApp.get('/api/promotions', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.status(500).send('Error occurred: database error');
            }

            res.json(users.map(function (user) {
                return {
                    id: user.id,
                    promotion_category: user.promotion_category,
                    promotion_type: user.promotion_type,
                    promotion_description: user.promotion_description
                };
            }));
        });
    });

    oApp.get('/api/promotions/:id', function (req, res) {
        User.findOne({ id: req.params.id }, function (err, user) {
            if (err || user === null) {
                return res.status(500).send('Error occurred: database error');
            }

            res.json({
                id: user.id,
                promotion_category: user.promotion_category,
                promotion_type: user.promotion_type,
                promotion_description: user.promotion_description
            });
        });
    });

    oApp.post('/api/promotions', function (req, res) {
        new User({
            id: req.body.id,
            promotion_category: req.body.promotion_category,
            promotion_type: req.body.promotion_type,
            promotion_description: req.body.promotion_description
        }).save(function (err, user) {
            if (err) {
                return res.status(500).send('Error occurred: database error');
            }
            res.json({
                id: user.id
            });
        });

    });

    oApp.delete('/api/promotions/:id', function (req, res) {
        User.remove({ id: req.params.id }, function (err) {
            if (err) {
                return res.status(500).send('Error occurred: database error');
            }

            return res.send();
        });
    });

    oApp.put('/api/promotions/:id', function(req,res){
        User.update({ 
            id: req.params.id
        }, {
            promotion_category: req.body.promotion_category,
            promotion_type: req.body.promotion_type,
            promotion_description: req.body.promotion_description  
        }, function(err){
            if(err){
                return res.status(500).send('Error occurred: database error');
            }
            res.send();
        }); 
    });

};