import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters',
                });
            } else {
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: 'Minh Đăng',
                    time: '8:00-9:00 Chủ nhật 24/3/2024',
                    doctorName: 'bác sĩ NVA',
                    redirectLink: 'https://www.youtube.com/watch?v=8idicWGjYBI',
                });
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                    },
                });

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusID: 'S1',
                            doctorID: data.doctorId,
                            patientID: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                    console.log('data', data);
                }
                resolve({
                    // data: user,
                    errCode: 0,
                    errMessage: 'Save info patient success',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
