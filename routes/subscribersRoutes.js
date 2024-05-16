const express = require("express")
const {newSubscriber} = require("../functions/subscribersFunctions")
const {checkUserID, checkChannelID} = require("../functions/channelFunctions")
const {checkSusbscription} = require("../functions/subscribersFunctions")
const subscribers = express.Router()




subscribers.post("/", async (req, res) => {
    const { userId, channelId } = req.body

    try {
        const userExists = await checkUserID(userId)
        if (!userExists) {
            return res.status(400).json({message: "User does not exist"})
        }

        const channelExists = await checkChannelID(channelId) 
        if (!channelExists) {
            return res.status(400).json({message: "Channel does not exist"})
        }

        const subscriptionExists = await checkSusbscription(userId, channelId)
        if (subscriptionExists) {
            return res.status(500).json({message: "Subscription already exists"})
        }

        const subscription = await newSubscriber(userId, channelId)
        return res.status(201).json({message: `Successfully subscribed user with id ${userId} to channel with id ${channelId}`, subscription})
    } catch (error) {
        return res.status(500).json({message: "Failed to subscribe"})
    }
})

module.exports = subscribers
