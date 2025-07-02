import { readEmailsFromExcel } from "../services/excelService.js";
import sendEmail from "../services/sendEmail.js";
import { emailTemplates } from "../data/emailTemplates.js";

class SendEmailController {
  async sendEmail(req, res) {
    try {
      const filePath = req.file?.path;
      if (!filePath) {
        return res.status(400).json({
          error: "file path is required field.",
        });
      }

      const emails = readEmailsFromExcel(filePath);
      console.log("emails from excel", emails);

      if (emails.length === 0) {
        return res
          .status(400)
          .json({ error: "No emails found in the Excel file." });
      }

      for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        const templateIndex = i % emailTemplates.length;
        const { subject, body } = emailTemplates[templateIndex];

        try {
          await sendEmail(email, subject, body);
          console.log(`✅ Email sent to ${email}`);
        } catch (err) {
          console.error(`❌ Failed to send to ${email}: ${err.message}`);
        }

        await new Promise((r) => setTimeout(r, 2000));
      }

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).json({ error: "Failed to send email" });
    }
  }
}

export default new SendEmailController();
