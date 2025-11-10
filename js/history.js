// Verificar si hay sesión activa
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  window.location.href = "index.html";
}

// Cargar transacciones
const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
const bodyHistorial = document.getElementById("bodyHistorial");

if (transacciones.length === 0) {
  swal("Sin transacciones", "No se encontraron movimientos registrados.", "info");
} else {
  transacciones.forEach((t) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${t.fecha}</td>
      <td>${t.tipo}</td>
      <td>$${t.monto.toFixed(2)}</td>
    `;
    bodyHistorial.appendChild(fila);
  });
}

// Botón para limpiar historial
document.getElementById("btnLimpiar").addEventListener("click", () => {
  swal({
    title: "¿Borrar historial?",
    text: "Se eliminarán todas las transacciones guardadas.",
    icon: "warning",
    buttons: ["Cancelar", "Sí, borrar"],
    dangerMode: true
  }).then((confirmado) => {
    if (confirmado) {
      localStorage.removeItem("transacciones");
      swal("Historial borrado", "Todas las transacciones fueron eliminadas.", "success")
        .then(() => window.location.reload());
    }
  });
});
