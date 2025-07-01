import nodemailer from "nodemailer";
// import axios from "axios";

const sendEmail = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // user: "pranjal.gogoi@techkilla.com",
        // pass: "vlrh lnmm ksky xwym",
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASSWORD,
      },
    });

    // Fetch image and save it as a buffer
    /*   const response = await axios.get(url, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary"); */

    // Email Content with Image Attachment
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      // cc: ["pranjalgogoi1209@gmail.com"],
      //   bcc: ["gogoipranjal2022@gmail.com"],
      subject,
      html: body,
      // text: body,
      /* attachments: [
        {
          filename: "image.png",
          content: imageBuffer,
          encoding: "base64",
        },
      ], */
    };

    // Send Email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error Sending Email:", error);
    throw error;
  }
};

export default sendEmail;
