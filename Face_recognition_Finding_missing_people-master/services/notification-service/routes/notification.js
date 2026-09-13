const express = require("express");
const router = express.Router();
const axios = require("axios");

// ROUTE 1: Dispatch WhatsApp notification
router.post("/send-whatsapp", async (req, res) => {
    try {
        const { number, name, adhaar, location } = req.body;

        const city = location?.city || "Unknown";
        const region = location?.region || "Unknown";
        const country = location?.country || "Unknown";
        const latitude = location?.latitude || "N/A";
        const longitude = location?.longitude || "N/A";

        const message = `Your Dear one with name ${name} bearing adhaar number ${adhaar} has been found at location country:${country} region:${region} latitude:${latitude} longitude:${longitude} city:${city} - Regards FindOne`;

        const ultraMsgInstance = process.env.ULTRAMSG_INSTANCE || "instance7517";
        const ultraMsgToken = process.env.ULTRAMSG_TOKEN || "uf5xnwpeveeinoh9";
        const url = `https://api.ultramsg.com/${ultraMsgInstance}/messages/chat`;

        const payload = new URLSearchParams({
            token: ultraMsgToken,
            to: `+91${number}`,
            body: message,
            priority: "1"
        }).toString();

        const response = await axios.post(url, payload, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        });

        console.log("Notification Dispatch Result:", response.data);
        res.status(200).json({ success: true, response: response.data });
    } catch (error) {
        console.error("Error dispatching notification:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
