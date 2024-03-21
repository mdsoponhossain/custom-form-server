const express = require('express');
const UserModel = require('../../schemas/userSchema/userSchema');
const { ObjectId } = require('mongodb');
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(404).json({ Error: error.message })

    }
})

userRoute.post('/create/user', async (req, res) => {
    try {
        const user = UserModel(req.body).save();
        res.status(200).json({ success: 'user successfully insterted' })
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
})

userRoute.patch('/update/user/:id', async (req, res) => {
    try {
        console.log(req.body)
        const result = await UserModel.updateOne({ _id: req.params.id }, {
            $set: {
                name: req?.body?.name,
                photo: req?.body?.photo
            }
        });
        console.log(result)
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
})
userRoute.delete('/delete/user/:id', async (req, res) => {
    try {
        const result = await UserModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
})

module.exports = userRoute;