/*
 ----------------------------------------------------------------------------------------
 Endpoints for quotes routes.
 ----------------------------------------------------------------------------------------
 Here's specified logic for fetching, sending, editing and deleting quotes in the DB 
 based on queries.

*/

const router = require("express").Router();
const quotes = require("../models/quotes.js");
const {jwtValidation} = require("../validation.js");


//Defining the endpoints GET, POST, PUT, DELETE

//GET /api/quotes/random
router.get('/', (req, res) => {
    quotes.aggregate([{ $sample: { size: 1 } }])
        .then(data => {
            if (data.length === 0) {
                res.status(404).send({ message: "No quotes found" });
            } else {
                res.send(data[0]);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

//GET /api/quotes/all
router.get('/all', (req, res) => {
    data = req.body;

    quotes.find()
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({message: err.message }); })
});

//POST [auth, user, check] /api/quotes
router.post('/', jwtValidation, (req, res) => {
    data = req.body;

    quotes.insertMany(data)
    .then(data => {res.status(201).send(data); })
    .catch(err => {res.status(500).send({message: err.message }); })
});

//PUT [auth, user, check] /api/quotes/:id
router.put('/:id', jwtValidation, (req, res) => {
    const id = req.params.id;

    quotes.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot update id: " + id + ". Quote not found." });
        } else {
            res.send({message: "Quote updated:" + data});
        }})
    .catch(err => {res.status(500).send({message: "Update failed: " + err.message }); })
});

//DELETE [auth, user, check] /api/quotes/:quoteID
router.delete('/:id', jwtValidation, (req, res) => {
    const id = req.params.id;

    quotes.findByIdAndDelete(id, req.body)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot delete id: " + id + ". Quote not found." });
        } else {
            res.send({message: "Quote deleted"});
        }})
    .catch(err => {res.status(500).send({message: "Delete failed: " + err.message }); })
});


module.exports = router;