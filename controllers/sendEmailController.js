import { readEmailsFromExcel } from "../services/excelService.js";
import sendEmail from "../services/sendEmail.js";

class SendEmailController {
  async sendEmail(req, res) {
    try {
      const filePath = req.file?.path;
      if (!filePath) {
        return res.status(400).json({
          error: "file path is required field.",
        });
      }

      // Parse emails
      const emails = readEmailsFromExcel(filePath);
      console.log("emails from excel", emails);

      if (emails.length === 0) {
        return res
          .status(400)
          .json({ error: "No emails found in the Excel file." });
      }

      // Send messages one-by-one with delay
      for (const email of emails) {
        try {
          await sendEmail(email);
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
