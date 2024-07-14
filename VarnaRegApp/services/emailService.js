const nodemailer = require('nodemailer');


// Create a nodemailer transporter using your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service (e.g., 'gmail')
    auth: {
        user: 'smvreg23@gmail.com',
        pass: 'fwan koxy lebl wgtp'
    }
});

// Function to send an email with attachment
const sendEmail = async (to, subject, body, attachmentPath) => {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'smvreg23@gmail.com', // Replace with your email address
            to,
            subject,
            text: body,
            attachments: [
                {
                    path: attachmentPath
                }
            ]
        });

        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};


module.exports = {
    sendEmail
}