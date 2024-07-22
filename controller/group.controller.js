const messages = require("../constant/message");
const GroupList = require("../model/grouplist");

exports.add_group = async (req, res, next) => {
  try {
    // Check if the email or phone already exists

    // Create user data
    const userData = {
      group_name: req.body.group_name,
      category_id: req.body.category_id,
      group_link: req.body.group_link,
      group_image: req.body.group_image,
      group_description: req.body.last_nagroup_descriptionme,
    };

    // Create the user in the database
    const createdUser = await GroupList.create(userData);

    // Send response
    return res.json({
      response: true,
      data: createdUser,
      message: messages.REGISTER_SUCCESS,
    });
  } catch (error) {
    return next(error);
  }
};

// exports.forgot_password = async (req, res, next) => {
//   const email = req.body.email;

//   try {
//     const foundUser = await User.findOne({ email: email });

//     if (!foundUser) {
//       return res.json({
//         response: false,
//         message: messages.INVALID_EMAIL,
//       });
//     }

//     const randomNumber = Math.floor(1000 + Math.random() * 9000);
//     const mailOptions = {
//       from: "zeel129patel@gmail.com",
//       to: email,
//       subject: "Password Reset OTP",
//       text: `This is your OTP for password change: ${randomNumber}`,
//     };

//     transporter.sendMail(mailOptions, async (error, info) => {
//       if (error) {
//         console.error(error);
//         return next(error);
//       } else {
//         await User.findOneAndUpdate(
//           { email: email },
//           { loginotp: randomNumber },
//           { new: false }
//         );
//         return res.json({
//           response: true,
//           message: messages.OTP_SEND,
//         });
//       }
//     });
//   } catch (error) {
//     return next(error);
//   }
// };
// exports.verify_otp = async (req, res, next) => {
//   const { email, otp } = req.body;

//   try {
//     const foundUser = await User.findOne({
//       email: email,
//       loginotp: { $ne: null },
//     });

//     if (!foundUser) {
//       return res.json({
//         response: false,
//         message: messages.RESEND_OTP,
//       });
//     }

//     if (foundUser.loginotp.toString() === otp) {
//       await User.findOneAndUpdate(
//         { email: email },
//         { loginotp: "" },
//         { new: false }
//       );
//       return res.json({
//         response: true,
//         message: messages.OTP_VERIFY,
//       });
//     } else {
//       return res.json({
//         response: false,
//         message: messages.INVALID_OTP,
//       });
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.reset_password = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     const foundUser = await User.findOne({ email: email });

//     if (!foundUser) {
//       return res.json({
//         response: false,
//         message: messages.NO_DATA_FOUND,
//       });
//     }

//     const hash = await bcrypt.hash(password, saltRounds); // Use a salt round of 10
//     await User.findOneAndUpdate(
//       { email: email },
//       { password: hash },
//       { new: false }
//     );

//     return res.json({
//       response: true,
//       message: messages.RESET_PASSWORD,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.logout = async (req, res, next) => {
//   const email = req.query.email;
//   await User.findOneAndUpdate(
//     { email: email },
//     { user_activated_status: false },
//     { new: false }
//   );
//   return res.json({ response: true, message: messages.LOGOUT_SUCCESS });
// };
