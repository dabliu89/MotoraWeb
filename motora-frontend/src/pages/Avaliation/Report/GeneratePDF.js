const { PDFDocument, rgb } = require('pdf-lib');
const fetch = require('node-fetch');
const fs = require('fs');

async function criarPDF(resultados) {
    
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 850]);

    const logoUrl = '/Logo.png';
    const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const { width, height } = logoImage.scale(0.2);
    page.drawImage(logoImage, {
        x: 30,
        y: page.getHeight() - height - 30,
        width,
        height
    });
    
    page.drawText('Resultados da Avaliação:', {
        x: 30,
        y: page.getHeight() - height - 80,
        size: 24,
        color: rgb(0, 0, 0)
    });

    let yOffset = page.getHeight() - height - 120;
    for (const [key, value] of Object.entries(resultados)) {
        page.drawText(`${key}: ${value}`, {
            x: 30,
            y: yOffset,
            size: 18,
            color: rgb(0, 0, 0)
        });
        yOffset -= 30;
    }
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('resultado_avaliacao.pdf', pdfBytes);
}

// Exemplo de resultados
const resultados = {
    'Teste de IMC': 'Zona Saudável',
    'Teste de RCE': 'Zona de Risco à Saúde',
    'Teste de Abdominais': 'Zona Saudável',
    'Arremesso de Medicine Ball': 'Zona Saudável',
    'Corrida de 20 Metros': 'Zona Saudável'
};