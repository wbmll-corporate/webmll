const nodemailer = require('nodemailer');

async function test() {
    console.log("Starting Hardcoded Connection Test...");

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'willyscotmegan@gmail.com', // Enter literal email
            pass: 'mdjblduuotyimboj'            // Enter 16-char App Password (no spaces)
        }
    });

    try {
        const info = await transporter.sendMail({
            from: 'willyscotmegan@gmail.com',
            to: 'willyscotmegan@gmail.com', 
            subject: "Hardcoded SMTP Test",
            text: "Testing Gmail connection without ENV variables."
        });
        
        console.log("✅ Success! Message ID:", info.messageId);
    } catch (error) {
        console.error("❌ SMTP Error:", error.message);
        
        if (error.message.includes('535-5.7.8')) {
            console.log("\nTIP: Error 535 usually means the App Password is wrong or spaces were left in it.");
        }
    }
}

test();