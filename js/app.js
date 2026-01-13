/* ================= TEXT TO PDF CONVERTER ================= */

// Access jsPDF safely
const { jsPDF } = window.jspdf;

/* ================= CONVERT FUNCTION ================= */
function convertToPDF() {
  const textInput = document.getElementById("textInput");
  const fileNameInput = document.getElementById("fileName");
  const titleInput = document.getElementById("pdfTitle");
  const fontSizeSelect = document.getElementById("fontSize");

  if (!textInput) return;

  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text first");
    return;
  }

  // File name
  let fileName = "converted-text";
  if (fileNameInput && fileNameInput.value.trim()) {
    fileName = fileNameInput.value.trim();
  }

  // Title
  const title = titleInput ? titleInput.value.trim() : "";

  // Font size
  const fontSize = fontSizeSelect ? Number(fontSizeSelect.value) : 12;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Page settings
  const marginX = 15;
  const marginY = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - marginX * 2;
  const pageHeightLimit = 280;

  let cursorY = marginY;

  // ----- TITLE -----
  if (title) {
    doc.setFont("Times", "Bold");
    doc.setFontSize(16);
    doc.text(title, marginX, cursorY);
    cursorY += 12;
  }

  // ----- BODY TEXT -----
  doc.setFont("Times", "Normal");
  doc.setFontSize(fontSize);

  const lines = doc.splitTextToSize(text, usableWidth);

  lines.forEach(line => {
    if (cursorY > pageHeightLimit) {
      doc.addPage();
      cursorY = marginY;
    }
    doc.text(marginX, cursorY, line);
    cursorY += 7;
  });

  // Download PDF
  doc.save(fileName + ".pdf");
}

/* ================= CLEAR TEXT ================= */
function clearText() {
  const textInput = document.getElementById("textInput");
  if (textInput) {
    textInput.value = "";
  }
}
