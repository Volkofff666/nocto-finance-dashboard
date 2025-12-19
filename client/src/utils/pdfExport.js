import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Экспорт коммерческого предложения в PDF
 * @param {HTMLElement} element - DOM элемент для экспорта
 * @param {string} filename - Имя файла для сохранения
 * @returns {Promise<void>}
 */
export async function exportProposalToPDF(element, filename = 'nocto-proposal.pdf') {
  if (!element) {
    throw new Error('Элемент для экспорта не найден');
  }

  try {
    // Создаём canvas из HTML элемента
    const canvas = await html2canvas(element, {
      scale: 2, // Увеличиваем качество
      backgroundColor: '#09090b', // Фон из дизайн-системы
      logging: false,
      useCORS: true, // Для загрузки изображений со сторонних доменов
      windowWidth: 1200 // Фиксированная ширина для консистентности
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Создаём PDF документ (A4 формат)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Рассчитываем размеры для вмещения на A4
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Добавляем первую страницу
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Если контент не вмещается, добавляем новые страницы
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
    console.error('Ошибка при экспорте PDF:', error);
    throw new Error(`Не удалось создать PDF: ${error.message}`);
  }
}

/**
 * Формирует имя файла для КП
 * @param {string} clientName - Имя клиента
 * @returns {string}
 */
export function generateProposalFilename(clientName) {
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const sanitizedName = clientName
    .replace(/[^\w\s-]/g, '') // Удаляем спецсимволы
    .replace(/\s+/g, '_') // Пробелы на подчёркивания
    .substring(0, 30); // Ограничиваем длину
  
  return `KP_${sanitizedName}_${timestamp}.pdf`;
}
