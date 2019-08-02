// Import modules
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Import models
const Planet = require('../../models/Planets')

// @route   GET /api/planets
// @desc    Get planets from db
// @access  Public
router.get('/', (req, res) => {
  Planet.find().exec((err, planets) => {
    if (err) {
      res.end(err)
    }
    res.json(planets)
  })
})

// @route    POST /api/planets
// @desc     Add new planet
// @accesss  Public
router.post('/', (req, res) => {
  const newPlanet = new Planet({
    name: req.body.name
  })

  newPlanet.save().then(planet => res.json(planet))
})

// @route   DELETE /api/planets/:id
// @desc    Delete a planet
// @access  Public
router.delete('/:id', (req, res) => {
  Planet
    .deleteOne({ _id: req.params.id })
    .then(res => res.json({success: true}))
    .catch(err => res.json({success: false}))
})

module.exports = router
