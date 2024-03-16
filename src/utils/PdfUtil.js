import jsPDF from "jspdf";
import 'jspdf-autotable'

export const pdfUtil = {

  generatePDF(EmployeesSalary) {

    const Days = 12;
    const basicEarning = (((EmployeesSalary.basic)/31)*Days).toFixed(2);
    const daEarning = (((EmployeesSalary.da)/31)*Days).toFixed(2);
    const hraEarning = (((EmployeesSalary.hra)/31)*Days).toFixed(2);
    const pfContribution = ((basicEarning*0.1).toFixed(2));
    const esiContribution = 0;

    const earningsData = [
      ["Description", "Rate", "Earnings"],
      ["Basic", EmployeesSalary.basic, basicEarning],
      ["DA", EmployeesSalary.da, daEarning],
      ["HRA", EmployeesSalary.hra, hraEarning],
      ["Medical Allowance", EmployeesSalary.medical_allowance, ""],
      ["Washing Allowance", EmployeesSalary.washing_allowance, ""],
      ["Other Allowance", EmployeesSalary.other_allowance, ""]
    ];

    const deductionsData = [
      ["Description", "Deductions"],
      ["PF Contribution", pfContribution],
      ["ESI Contribution", esiContribution],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];


    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setProperties({
      title: "Salary Slip - October 2023",
      subject: "Salary details for Ms Sneha Shah",
      author: "CONCERTEBAR BUILDCON LLP",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pegeHeight = doc.internal.pageSize.getHeight();
    const mid = pageWidth / 2 + 20;
    const uppermargin = 6;
    const lineSpacing = 4.7;
    const leftmargin = 20;
    const rightmargin = pageWidth - leftmargin;

    const lineNum = (linenumber) => {
      return (uppermargin + (linenumber * lineSpacing));
    }
    const calculateCenterX = (text) => {
      const fontSize = doc.internal.getFontSize();
      const textWidth = doc.getTextWidth(text);
      return (pageWidth - textWidth) / 2;
    };

    const companyName = "CONCERTEBAR BUILDCON LLP";
    const companyAddress1 = "I WING.435 ROCK ENCLAVE BUILD NO 2";
    const companyAddress2 = "opp jayice cream hindustan naka kandivali west 400067";

    doc.text("*****************************************************************************************************************************", leftmargin, pegeHeight / 2);

    doc.text(companyName, calculateCenterX(companyName), lineNum(1));
    doc.text(companyAddress1, calculateCenterX(companyAddress1), lineNum(2));
    doc.text(companyAddress2, calculateCenterX(companyAddress2), lineNum(3));

    doc.text("Salary for the month: October 2023", leftmargin, lineNum(5));
    doc.text("Name    : Ms Sneha Shah", leftmargin, lineNum(6));
    doc.text("Emp No  : 17", mid, lineNum(6));
    doc.text("Location: ", leftmargin, lineNum(7));
    doc.text("Designation: UNSKILLED", mid, lineNum(7));
    doc.text("P F No: KDMAL1818048000/10011", leftmargin, lineNum(8));
    doc.text("UAN: 101430860842", mid, lineNum(8));
    doc.text("E S I C No: ", leftmargin, lineNum(9));
    doc.text("Days :", leftmargin, lineNum(10));
    doc.text("Leave: 15.0", mid - 30, lineNum(10));
    doc.text("WOP: 0.0", 150, lineNum(10));
    doc.text("===================================================================================", leftmargin, lineNum(11));
    

    doc.autoTable({
      head: [earningsData[0]],
      body: earningsData.slice(1),
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        overflow: 'linebreak'
      },
      startY: lineNum(12),
      margin: { left: leftmargin, top: 120 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 20, align: "right" },
        2: { cellWidth: 25, align: "right" },
      }
    });

    doc.autoTable({
      head: [deductionsData[0]],
      body: deductionsData.slice(1),
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        overflow: 'linebreak'
      },
      startY: lineNum(12),
      margin: { left: mid - 10, top: 120 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 25, align: "right" },
      }
    });

    doc.text("--------------------------------------------------------------------------------------------------------------------------------------------------", leftmargin, lineNum(22));

    doc.text("Gross Earnings", leftmargin, lineNum(23));
    doc.text("9758", mid - 30, lineNum(23), { align: "right" });
    doc.text("Gross Deductions", mid - 10, lineNum(23));
    doc.text("1245", rightmargin, lineNum(23), { align: "right" });
    doc.text("Net Payable", leftmargin, lineNum(24));
    doc.text("8513", rightmargin, lineNum(24), { align: "right" });
    doc.text("===================================================================================", leftmargin, lineNum(25));
    doc.text("Date of Payment:", leftmargin, lineNum(26));

    doc.save("salary_slip.pdf");
  },


  generatePDF1(employees) {


   /*  employees is a array of following object
    {
  advanced_recovered: "0",
  basic: "30.00",
  company_id: "987",
  conveyance: "0",
  da: "30.00",
  daily_rate: "0",
  days_paid: "0",
  earned_leave: "0",
  employee_name: "Adbhishek",
  employee_number: "12",
  employee_type: "0",
  esi_contribution: "0",
  gross: "0",
  gross_earning: "90",
  hra: "30.00",
  incentive: "0",
  income_tax: "0",
  labour_wf: "0",
  loan_recovered: "0",
  madical_allowance: "0",
  month: "February",
  monthly_rate: "0",
  net_payable: "0",
  other_allowance: "0",
  other_deductions: "0",
  overtime_hours: "0",
  overtime_pay: "0",
  pf_contribution: "0",
  professional_tax: "0",
  reimbursement: "0",
  total_earning: "0",
  vol_pf: "0",
  washing_allowance: "0",
  wp: "0",
  year: "2024"
}
 */
  const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const columnWidth = (pageWidth - 3 * margin) / 2;
    const rowHeight = 10;
    
    // Iterate over employees in batches of two
    for (let i = 0; i < employees.length; i += 2) {
        doc.addPage();
        const startX = margin;
        let startY = margin;

        // Iterate over each pair of employees
        for (let j = i; j < Math.min(i + 2, employees.length); j++) {

          



            const employee = employees[j];
            console.log("pdfUtil::emplyeeSalry", employee);
            const earningsData = this.calculateEarningsData(employee);
            const deductionsData = this.calculateDeductionsData(employee);


            // Print employee details and salary table
            doc.text(`Employee Name: ${employee.employee_name}`, startX, startY);
            startY += rowHeight;
            doc.text(`Employee ID: ${employee.employee_number}`, startX, startY);
            startY += rowHeight;

            doc.autoTable({
                head: [earningsData[0]],
                body: earningsData.slice(1),
                startY: startY + rowHeight,
                margin: { left: startX, top: startY + 2 * rowHeight },
                columnStyles: {
                    0: { cellWidth: columnWidth * 0.5 },
                    1: { cellWidth: columnWidth * 0.25, align: 'right' },
                    2: { cellWidth: columnWidth * 0.25, align: 'right' },
                }
            });

            doc.autoTable({
                head: [deductionsData[0]],
                body: deductionsData.slice(1),
                startY: startY + rowHeight,
                margin: { left: startX + columnWidth, top: startY + 2 * rowHeight },
                columnStyles: {
                  0: { cellWidth: columnWidth * 0.5 },
                    1: { cellWidth: columnWidth * 0.25, align: 'right' },
                    // 2: { cellWidth: columnWidth * 0.25, align: 'right' },
                }
            });

            startY += Math.max(doc.previousAutoTable.finalY, 30) + rowHeight;
        }
    }

    doc.save('salary_slip.pdf');
},

  calculateEarningsData(EmployeesSalary) {
    // Calculate earnings data for the employee

    const Days = EmployeesSalary.days_paid;
    const basicEarning = (EmployeesSalary.basic)
    const daEarning = (EmployeesSalary.da)
    const hraEarning = (EmployeesSalary.hra)

    return [
      ["Description", "Rate", "Earnings"],
      ["Basic", EmployeesSalary.basic, basicEarning],
      ["DA", EmployeesSalary.da, daEarning],
      ["HRA", EmployeesSalary.hra, hraEarning],
      ["Medical Allowance", EmployeesSalary.medical_allowance, ""],
      ["Washing Allowance", EmployeesSalary.washing_allowance, ""],
      ["Other Allowance", EmployeesSalary.other_allowance, ""]
    ];
   
},

calculateDeductionsData(EmployeesSalary) {
    // Calculate deductions data for the employee

    const Days = EmployeesSalary.days_paid;
    const basicEarning = (EmployeesSalary.basic)
    const pfContribution = (EmployeesSalary.pf_contribution)
    const esiContribution = 0;

    return [
      ["Description", "Deductions"],
      ["PF Contribution", pfContribution],
      ["ESI Contribution", esiContribution],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
}


}