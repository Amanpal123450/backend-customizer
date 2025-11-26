const nodemailer = require("nodemailer");

exports.contact = async (req, res) => {
  try {
    const { firstName, lastName, subject, phone, message } = req.body;

    if (!firstName || !lastName || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yourdestination@email.com",
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send mail",
    });
  }
};
