const path = require('path');
const qrCodeService = require('./QRcodeService');
const emailService = require('./emailService');
const client = require('./db');

const register = async (data) => {
    const { name, college, email, usn, contact } = data;

    try {
        // Insert data into the database
        const result = await client.query(
            "INSERT INTO registration(name, college, email, usn, contact) VALUES($1, $2, $3, $4, $5) RETURNING id",
            [name, college, email, usn, contact]
        );

        // Check if the insertion was successful
        if (result.rowCount) {
            const insertedId = result.rows[0].id;

            // Generate QR code with the inserted ID
            const qrCodeData = insertedId.toString(); // Convert to string if not already

            // Generate QR code image file
            
            const qrCodeImagePath = path.join(__dirname, 'qrcodes', `qrcode_${insertedId}.png`);
            await qrCodeService.generateQRCodeToFile(qrCodeData, qrCodeImagePath);

            // Send the QR code as an email attachment
            await emailService.sendEmail(email, 'Subject: Registration Successful', `Your registration was successful! Here is your QR code:`, qrCodeImagePath);

            return "success";
        } else {
            return "something went wrong";
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return "something went wrong";
    }
};

const getRegistrationStatus = async (id) => {
    const result =  await client.query(
        'SELECT * FROM registration WHERE id = $1;', [id]);
     return result.rows? result.rows[0] : "user doesnot exist"  
}

const postDataForId = async (id, attendance) => {
    
    try {
       
        const result = await client.query(
            "UPDATE registration SET attendance = $1 WHERE id = $2 RETURNING id, attendance",
            [attendance, id]
        );

        if (result.rows.length === 0) {
            throw new Error(`No row with ID ${id} found`);
        }

        console.log(`Data for ID ${id} updated successfully. Updated row ID: ${result.rows[0].id}`);
    } catch (error) {
        console.error("Error updating data:", error.message);
    }
};





module.exports = {
    register,
    getRegistrationStatus,
    postDataForId
}