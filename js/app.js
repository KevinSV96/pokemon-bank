// Mostrar mes actual en el título
const fecha = new Date();
const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
document.getElementById('titulo').textContent = `Presupuesto de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;

// Arreglos para almacenar transacciones
let ingresos = [];
let egresos = [];

// Función para actualizar totales
function actualizarTotales() {
  const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
  const totalEgresos = egresos.reduce((sum, t) => sum + t.monto, 0);
  const total = totalIngresos - totalEgresos;
  const porcentaje = totalIngresos ? (totalEgresos / totalIngresos * 100).toFixed(2) : 0;

  document.getElementById('totalIngresos').textContent = totalIngresos.toFixed(2);
  document.getElementById('totalEgresos').textContent = totalEgresos.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
  document.getElementById('porcentajeGasto').textContent = porcentaje;
}

// Mostrar lista de transacciones
function mostrarLista(tipo) {
  const contenedor = document.getElementById('listaTransacciones');
  contenedor.innerHTML = '';
  const lista = tipo === 'ingreso' ? ingresos : egresos;

  lista.forEach(t => {
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between border p-2 mb-1 bg-white';
    if (tipo === 'ingreso') {
      div.innerHTML = `<span>${t.descripcion}</span><strong>+$${t.monto.toFixed(2)}</strong>`;
    } else {
      const totalIngresos = ingresos.reduce((sum, t) => sum + t.monto, 0);
      const porcentaje = totalIngresos ? (t.monto / totalIngresos * 100).toFixed(2) : 0;
      div.innerHTML = `<span>${t.descripcion}</span><strong>-$${t.monto.toFixed(2)} (${porcentaje}%)</strong>`;
    }
    contenedor.appendChild(div);
  });
}

// Agregar nueva transacción
document.getElementById('agregar').addEventListener('click', () => {
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value.trim();
  const monto = parseFloat(document.getElementById('monto').value);

  if (!descripcion || isNaN(monto) || monto <= 0) {
    alert('Por favor ingrese datos válidos.');
    return;
  }

  const transaccion = { descripcion, monto };

  if (tipo === 'ingreso') ingresos.push(transaccion);
  else egresos.push(transaccion);

  document.getElementById('descripcion').value = '';
  document.getElementById('monto').value = '';

  actualizarTotales();
  mostrarLista(tipo);
});

// Tabs
document.getElementById('tabIngresos').addEventListener('click', () => {
  document.getElementById('tabIngresos').classList.add('active');
  document.getElementById('tabEgresos').classList.remove('active');
  mostrarLista('ingreso');
});

document.getElementById('tabEgresos').addEventListener('click', () => {
  document.getElementById('tabEgresos').classList.add('active');
  document.getElementById('tabIngresos').classList.remove('active');
  mostrarLista('egreso');
});

// Mostrar lista inicial
mostrarLista('ingreso');
