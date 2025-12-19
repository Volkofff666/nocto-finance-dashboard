import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Экспорт HTML элемента в PDF
 * @param {HTMLElement} element - Элемент для экспорта
 * @param {string} filename - Имя файла PDF
 */
export async function exportProposalToPDF(element, filename = 'nocto-proposal.pdf') {
  try {
    // Создаем canvas из HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#09090b',
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Размеры A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Добавляем первую страницу
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Добавляем остальные страницы, если нужно
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Сохраняем PDF
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    alert('Ошибка при экспорте в PDF');
    return false;
  }
}
