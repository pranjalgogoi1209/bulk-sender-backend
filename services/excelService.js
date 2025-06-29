import XLSX from "xlsx";

export function readEmailsFromExcel(filePath) {
  try {
    console.log("excel is working");

    // Read the file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse the sheet into JSON
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Remove header row and extract first column
    const numbers = data
      .slice(1) // skip header
      .map((row) => {
        const num = row[0];
        if (num) {
          return `${String(num).trim()}`;
        }
      })
      .filter((number) => number); // filter out empty rows

    return numbers;
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
    return [];
  }
}
