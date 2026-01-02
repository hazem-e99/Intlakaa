import * as XLSX from "xlsx";
import { Request } from "@/services/requestsService";

/**
 * Export requests data to Excel file
 * @param data - Array of request objects to export
 * @param filename - Name of the Excel file (default: requests_export.xlsx)
 */
export const exportToExcel = (data: Request[], filename: string = "requests_export.xlsx") => {
  try {
    // Prepare data for Excel - transform to Arabic headers
    const excelData = data.map((request) => ({
      "الاسم": request.name,
      "رقم الهاتف": request.phone,
      "رابط المتجر": request.storeUrl,
      "المبيعات الشهرية": request.monthlySales,
      "عنوان الجهاز": request.ipAddress || "-",
      "الدولة": request.country || "-",
      "مفتاح الدولة": request.phoneCountry || "-",
      "تاريخ الإنشاء": new Date(request.createdAt).toLocaleString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better readability
    const columnWidths = [

      { wch: 25 }, // الاسم
      { wch: 20 }, // رقم الهاتف
      { wch: 35 }, // رابط المتجر
      { wch: 20 }, // المبيعات الشهرية
      { wch: 18 }, // عنوان الجهاز
      { wch: 20 }, // الدولة
      { wch: 20 }, // مفتاح الدولة
      { wch: 30 }, // تاريخ الإنشاء
    ];
    worksheet["!cols"] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "الطلبات");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, filename);

    return true;
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw new Error("فشل تصدير البيانات إلى Excel");
  }
};
