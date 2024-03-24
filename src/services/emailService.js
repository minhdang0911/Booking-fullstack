const nodemailer = require('nodemailer');
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Minh Dang 👻" <minhdang9a8@gmail.com>',
        to: dataSend.reciverEmail,
        subject: 'Thông tin đặt lịch khám bệnh',
        // text: 'Hello world?',
        html: getBodyHTMLEmail(dataSend),
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    let signature = '<p style="margin-top: 20px;">Best regards,</p><p>Booking Care Team</p>';

    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care.</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <ul>
                <li><b>Thời gian:</b> ${dataSend.time}</li>
                <li><b>Bác sĩ:</b> ${dataSend.doctorName}</li>
            </ul>
            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh:</p>
            <p><a href="${dataSend.redirectLink}" target="_blank">Click here</a></p>
            ${signature}
        `;
    }

    if (dataSend.language === 'en') {
        result = `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You have received this email because you booked an online medical appointment on Booking Care.</p>
            <p>Information for scheduling medical examination:</p>
            <ul>
                <li><b>Time:</b> ${dataSend.time}</li>
                <li><b>Doctor:</b> ${dataSend.doctorName}</li>
            </ul>
            <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure:</p>
            <p><a href="${dataSend.redirectLink}" target="_blank">Click here</a></p>
            ${signature}
        `;
    }

    return result;
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
};
