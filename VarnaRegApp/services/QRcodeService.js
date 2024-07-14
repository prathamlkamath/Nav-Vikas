const QRCode = require('qrcode');

// Function to generate QR code and save it to a file
const generateQRCodeToFile = async (data, path) => {
    try {
        await QRCode.toFile(path, data);
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
};

module.exports ={
    generateQRCodeToFile
}