const Gp = require('../models/Gp')
const User = require('../models/User')
const mongoose = require('mongoose')


const getGp = async (req, res) => {
   const currentUser = await User.findOne({_id: req.user.id}, (err, user))
   if (err) {
      console.error(err)
      return
   }
   if (!user) {
      res.status(404).json({error: 'User not found'})
   }
   res.json(currentUser)
   // res.status(200).json(currentUser)
   // const {currencies} = currentUser

   // const gpAmounts = await currentUser[2]
   // // await res.status(200).json(gpAmounts)
   // console.log(`gpAmounts: ${gpAmounts}`)
   // console.log(`currentUser: ${currentUser.email}`)

}

const updateGp = async (req, res) => {
   // const userId = req.user.id
   try {
      console.log(req.body)
      await User.findByIdAndUpdate(
         {_id: req.user.id},
         {currencies: req.body},
         { new: true }
         // {
         //    qty: req.body.qty,
         //    notes: req.body.notes
         // }
      )

      
      ////////Example///////
      // const updateDocument = async (id) => {
      //    try {
      //      const updatedResult = await User.findByIdAndUpdate(
      //        { _id: id },
      //        {
      //          profession: "Backend Developer",
      //        },
      //      );
      //      console.log(updatedResult);
      //    } catch (error) {
      //      console.log(error);
      //    }
      //  };
      ////////////////////////




      // const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, )

      //res.json('Updated qty')
   } catch(err) {
      console.log(err)
   }
}

const deleteItem = async (req,res) => {
   try {
      // await Inventory.findOneAndDelete({_id:req.body.itemIdFromJSFile})

      // await Inventory.findOneAndDelete({_id: req.params.id})

      await Inventory.findByIdAndDelete(req.params.id)


      // const item = await Inventory.findById(req.params.id)
      // if (!item) {
      //    res.status(400)
      //    throw new Error('Not found')
      // }
      // await item.remove()

      res.status(200).json({ id: req.params.id })
   } catch(err) {
      console.log(err)
   }
}

module.exports = {
   getGp,
   updateGp
}