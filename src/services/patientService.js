import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorID, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorID}`;

    return result;
};

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters',
                });
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                });
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
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
                            token: token,
                        },
                    });
                    console.log('data', data);
                    console.log('User:', user);
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

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters',
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorID: data.doctorId,
                        token: data.token,
                        statusID: 'S1',
                    },
                    raw: false,
                });
                if (appointment) {
                    appointment.statusID = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update appointment success',
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,

    postVerifyBookAppointment: postVerifyBookAppointment,
};
