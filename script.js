function setDetalleVenta(detalleHTML) {
    const tbody = document.getElementById("detalleVenta");
    if (tbody) {
        // Dividir la cadena en filas usando <tr>
        let filas = detalleHTML.split('<tr>').filter(fila => fila.trim() !== '');
        
        let htmlTabla = filas.map(fila => {
            // Dividir cada fila en celdas usando <td>
            let celdas = fila.split('<td>').filter(celda => celda.trim() !== '');
            
            // Limpiar cada celda de etiquetas HTML restantes
            celdas = celdas.map(celda => 
                celda.replace('</td>', '')
                     .replace('</tr>', '')
                     .trim()
            );

            // Construir la fila HTML
            if (celdas.length >= 6) {
                return `<tr>
                    <td>${celdas[0]}</td>
                    <td>${celdas[1]}</td>
                    <td>${celdas[2]}</td>
                    <td>${celdas[3]}</td>
                    <td>${celdas[4]}</td>
                    <td>${celdas[5]}</td>
                </tr>`;
            }
            return '';
        }).join('');

        tbody.innerHTML = htmlTabla;
    }
}
