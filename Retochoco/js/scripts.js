async function cargarDatos() {
    const response = await fetch("data/muertes_accidente_electrico.json");
    const datos = await response.json();
    const fila = document.getElementById('fila');
    fila.innerHTML= '';
    datos.forEach(item => {
        const tr = document.createElement('tr');
        const tdEmpresa = document.createElement('td');
        tdEmpresa.textContent = item.empresa;
        const tdEdad = document.createElement('td');
        tdEdad.textContent = item.edad;

        if(item.edad >= 15){
            tdEdad.style.color = 'red';
        
        }

        const tdEstado = document.createElement('td');
        const estado = item.medidas >= 15 ? '⚠Grave' : '🛑Critico';
        tdEstado.textContent = estado
        
        tr.appendChild(tdEmpresa);
        tr.appendChild(tdEdad);
        tr.appendChild(tdEstado);

        fila.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', cargarDatos);