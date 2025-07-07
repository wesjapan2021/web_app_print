// Función para sanitizar el HTML
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Función para formatear fecha a dd/mm/yyyy
function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr; // Si no es una fecha válida, retorna el string original
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error('Error formateando fecha:', e);
        return dateStr;
    }
}

// Función para obtener y decodificar parámetros de la URL
function getUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
        detalleVenta: urlParams.get('detalleVenta') || '',
        noVenta: urlParams.get('noVenta') || '',
        tipoVenta: urlParams.get('tipoVenta') || '',
        transporte: urlParams.get('transporte') || '',
        fecha: formatDate(urlParams.get('fecha')) || '',
        nombreEmpresa: urlParams.get('nombreEmpresa') || '',
        nombreCliente: urlParams.get('nombreCliente') || '',
        direccion: urlParams.get('direccion') || '',
        noNit: urlParams.get('noNit') || '',
        codigoCliente: urlParams.get('codigoCliente') || '',
        telefono: urlParams.get('telefono') || '',
        ruta: urlParams.get('ruta') || '',
        area: urlParams.get('area') || '',
        totalVenta: urlParams.get('totalVenta') || '',
        nombreAsesor: urlParams.get('nombreAsesor') || '',
        telefonoAsesor: urlParams.get('telefonoAsesor') || ''
    };

    // Decodificar todos los valores
    Object.keys(params).forEach(key => {
        try {
            params[key] = decodeURIComponent(params[key] || '');
        } catch (e) {
            console.error(`Error decodificando ${key}:`, e);
            params[key] = '';
        }
    });

    return params;
}

// Función para asignar valores a los elementos HTML
function setValues() {
    const params = getUrlParameters();
    
    // Asignar valores a los elementos
    document.getElementById("noVenta").textContent = params.noVenta;
    document.getElementById("tipoVenta").textContent = params.tipoVenta;
    document.getElementById("transporte").textContent = params.transporte;
    document.getElementById("fecha").textContent = params.fecha;
    document.getElementById("nombreEmpresa").textContent = params.nombreEmpresa;
    document.getElementById("nombreCliente").textContent = params.nombreCliente;
    document.getElementById("direccion").textContent = params.direccion;
    document.getElementById("ruta").textContent = params.ruta;
    document.getElementById("area").textContent = params.area;
    document.getElementById("noNit").textContent = params.noNit;
    document.getElementById("codigoCliente").textContent = params.codigoCliente;
    document.getElementById("telefono").textContent = params.telefono;
    document.getElementById('totalVenta').textContent = new Intl.NumberFormat('es-GT', { 
    style: 'currency', 
    currency: 'GTQ'
}).format(params.totalVenta);
    document.getElementById("nombreAsesor").textContent = params.nombreAsesor;
    document.getElementById("telefonoAsesor").textContent = params.telefonoAsesor;

    // Manejar la tabla de detalles
    if (params.detalleVenta) {
        document.getElementById("detalleVenta").innerHTML = params.detalleVenta;
    }
}

// Función para generar PDF
async function generatePDF() {
    const element = document.body;
    const noVenta = document.getElementById("noVenta").textContent || 'sin_numero';
    const fileName = `PEDIDO_${noVenta}.pdf`;

    const opt = {
        margin: 10,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm',
            format: 'letter',
            orientation: 'portrait',
            hotfixes: ['px_scaling']
        }
    };

    try {
        await html2pdf().from(element).set(opt).save();
    } catch (error) {
        console.error('Error generando PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor, intente nuevamente.');
    }
}

// Inicialización cuando se carga la página
window.onload = async function() {
    try {
        setValues();
        // Esperar un momento para que se carguen los datos
        setTimeout(async () => {
            await generatePDF();
        }, 1000);
    } catch (error) {
        console.error('Error en la inicialización:', error);
        alert('Ocurrió un error al inicializar la página. Por favor, recargue la página.');
    }
}; 
