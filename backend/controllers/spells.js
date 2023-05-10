const Spells = require('../models/Spells')
const mongoose = require('mongoose')


const getSpells = async (req, res) => {
   const spellsFromServer = await Spells.find()
   res.status(200).json(spellsFromServer)
}

const addSpell = async (req, res) => {
   const {name, index} = req.body
   
   try {
      const spell = await Spells.create({name, index})
      res.status(200).json(spell)
   } catch (error) {
      res.status(400).json({error: error.message})
   }
}

const updateSpell = async (req, res) => {
   const id = req.params.id
   try {
      console.log(req.body)
      await Spells.findByIdAndUpdate(
         id,
         {
            name: req.body.name,
            index: req.body.index
         }
      )
   } catch(err) {
      console.log(err)
   }
}

const deleteSpell = async (req, res) => {
   console.log(`deleted spell ${req.params.id}`)

   try {
      await Spells.findByIdAndDelete(req.params.id)
      res.status(200).json({ id: req.params.id })
   } catch(err) {
      console.log(err)
   }
}

module.exports = {
   getSpells,
   addSpell,
   updateSpell,
   deleteSpell
}