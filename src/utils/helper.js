import html2pdf from "html2pdf.js";

export const formateDate = function (utcDate) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new Date(utcDate).toLocaleString("en-IN", {
    timeZone: userTimeZone,
    day: "2-digit",
    month: "long",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });
  return localDate;
};

export const formateDeliveryDate = function (utcDate) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Date(utcDate);

  date.setDate(date.getDate() + 1);

  const localDate = date.toLocaleDateString("en-IN", {
    timeZone: userTimeZone,
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return localDate;
};

export const downloadBillReceipt = function (
  elementId,
  fileName = "Book_Order_Receipt.pdf",
) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const options = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: "in", format: [14, 21], orientation: "portrait" },
  };
  html2pdf().set(options).from(element).save();
};
