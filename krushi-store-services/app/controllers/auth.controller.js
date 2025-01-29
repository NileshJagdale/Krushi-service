const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// const { validationResult } = require("express-validator");
const twilio = require('twilio');

// Twilio credentials 
const apiKey = 'YOUR_MSG91_API_KEY';
const sender = 'MSG91_SENDER_ID'; // Use the sender ID provided by MSG91

// In-memory store for OTPs
const otps = new Map();

const authController = {
    login: async (req, res) => {
        try {
            // Validate the user input
            // const errors = validationResult(req);

            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ message: errors.array() });
            // }

            await User.findByMobileOrPassword(req.body, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found user with mobile.`
                        });
                    } else {
                        // console.log("Request Body:", req.body);
                        res.status(500).send({
                            message: "Error retrieving user with mobile no"
                        });
                    }
                } else {
                    const result = {
                        "id": data.id,
                        "name": data.name,
                        "mobile": data.mobile,
                        "email": data.email,
                        "role": data.role,
                        "address": data.address,
                        "assignId": data.assignId
                    }
                    const token = jwt.sign(
                        { userId: data.id, email: data.mobile },
                        'property',
                        {
                            expiresIn: "100d", // Adjust the expiration time as needed
                        }
                    );

                    res.status(200).send({ data: result, token: token });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Login failed" });
        }
    },

    sendOTP: async (req, res) => {
        try {
            const phone = req.body.mobile;
            await User.findByMobile(phone, (err, data) => {
                if (!err) {
                    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
                    const otp = 111111;
                    otps.set(phone, otp);
                    res.status(200).send({ success: true, message: 'OTP sent successfully' });
                    // client.messages.create({
                    //     body: `Your OTP is ${otp}`,
                    //     from: '+120 7123 4567', // Replace with your Twilio number
                    //     to: phone
                    // }).then(message => {
                    //     otps.set(phone, otp);
                    //     res.status(200).send({ success: true, message: 'OTP sent successfully' });
                    // }).catch(error => {
                    //     res.status(500).send({ success: false, message: 'Failed to send OTP', error });
                    // });
                } else {
                    const result = {
                        "id": data.id,
                        "name": data.name,
                        "mobile": data.mobile,
                        "email": data.email,
                        "role": data.role,
                        "address": data.address,
                        "assignId": data.assignId
                    }
                    res.status(200).send({ success: true, message: 'mobile verified', data: result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Login failed" });
        }
    },

    verifyOTP: async (req, res) => {
        try {
            const phone = req.body.mobile;
            const otp = parseInt(req.body.otp);
            if (otps.get(phone) === otp) {
                otps.delete(phone);
                const token = jwt.sign(
                    { userId: otp, email: phone },
                    'property',
                    {
                        expiresIn: "100d", // Adjust the expiration time as needed
                    }
                );

                res.status(200).send({ token: token, message: 'OTP verified successfully' });
            } else {
                res.status(400).send({ success: false, message: 'Invalid OTP' });
            }
        } catch (error) {
            res.status(500).json({ message: "Login failed" });
        }
    },

};

module.exports = authController;