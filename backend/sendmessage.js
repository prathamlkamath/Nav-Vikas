const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSMS(user, camp) {
    try {
        const message = await client.messages.create({
            body: `Hello ${user.name},\nThis is a greeting card.\nThere is a camp in your area by doctor ${camp.docname}.\nCamp details: ${camp.desc}.\nPlease visit our website for more details: http://localhost:5173/`,
            from: `+12515720303`,
            to: `+918971318455` // This will work as expected
        });
        console.log(`SMS sent to ${user.phone}. Status: ${message.status}`);
    } catch (error) {
        console.error(`Error sending SMS to ${user.phone}: ${error.message}`);
    }
}

module.exports = sendSMS;
