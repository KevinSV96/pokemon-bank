// Verificar si hay sesión activa
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  window.location.href = "index.html";
}

// Obtener transacciones
const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

if (transacciones.length === 0) {
  swal("Sin datos", "No existen transacciones para graficar.", "info");
} else {
  // Contar tipos de transacción
  let depositos = 0, retiros = 0, pagos = 0;

  transacciones.forEach(t => {
    if (t.tipo === "Depósito") depositos++;
    else if (t.tipo === "Retiro") retiros++;
    else if (t.tipo === "Pago de Servicio") pagos++;
  });

  // Crear gráfico con Chart.js
  const ctx = document.getElementById("graficoTransacciones").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Depósitos", "Retiros", "Pagos de Servicio"],
      datasets: [{
        label: "Transacciones",
        data: [depositos, retiros, pagos],
        backgroundColor: [
          "rgba(40, 167, 69, 0.7)",  // verde
          "rgba(220, 53, 69, 0.7)",  // rojo
          "rgba(255, 193, 7, 0.7)"   // amarillo
        ],
        borderColor: [
          "rgba(40, 167, 69, 1)",
          "rgba(220, 53, 69, 1)",
          "rgba(255, 193, 7, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 14 } }
        },
        title: {
          display: true,
          text: "Distribución de Transacciones por Tipo",
          font: { size: 18 }
        }
      }
    }
  });
}
