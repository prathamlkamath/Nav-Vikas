const QRCode = require('qrcode');
const fs = require('fs/promises'); // Using the promises version of the fs module

const generateQRCode = async (data) => {
    try {
        const qrCodeImageUrl = await QRCode.toDataURL(data);
        return qrCodeImageUrl;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
};

const writeQRCodeToFile = async (data, fileName) => {
    try {
        const qrCodeImageUrl = await generateQRCode(data);
        const imageData = qrCodeImageUrl.split(';base64,').pop();
        await fs.writeFile(fileName, imageData, { encoding: 'base64' });
        console.log(`QR code saved to ${fileName}`);
    } catch (error) {
        console.error("Error writing QR code to file:", error);
        throw error;
    }
};

// Specify the file name (e.g., 'qrcode.png')
const fileName = 'qrcode.png';

// Call the function to generate and write QR code to file
writeQRCodeToFile("testing", fileName);
