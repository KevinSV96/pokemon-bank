// Obtener datos de LocalStorage
let usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  window.location.href = "index.html"; // si no hay sesión
}

// Mostrar datos del usuario
document.getElementById("usuarioDatos").textContent =
  `${usuario.nombre} - Cuenta Nº ${usuario.cuenta}`;
document.getElementById("saldo").textContent = usuario.saldo.toFixed(2);

// Registrar transacciones en LocalStorage
if (!localStorage.getItem("transacciones")) {
  localStorage.setItem("transacciones", JSON.stringify([]));
}

// Función para guardar y actualizar saldo
function actualizarSaldo(nuevoSaldo) {
  usuario.saldo = nuevoSaldo;
  localStorage.setItem("usuario", JSON.stringify(usuario));
  document.getElementById("saldo").textContent = usuario.saldo.toFixed(2);
}

// Función para agregar transacción
function registrarTransaccion(tipo, monto) {
  const transacciones = JSON.parse(localStorage.getItem("transacciones"));
  const nueva = {
    tipo: tipo,
    monto: monto,
    fecha: new Date().toLocaleString()
  };
  transacciones.push(nueva);
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

// Función para generar comprobante PDF
function generarPDF(tipo, monto) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Pokémon Bank - Comprobante de Transacción", 10, 20);
  doc.setFontSize(12);
  doc.text(`Cliente: ${usuario.nombre}`, 10, 35);
  doc.text(`Cuenta: ${usuario.cuenta}`, 10, 45);
  doc.text(`Tipo de transacción: ${tipo}`, 10, 60);
  doc.text(`Monto: $${monto.toFixed(2)}`, 10, 70);
  doc.text(`Saldo actual: $${usuario.saldo.toFixed(2)}`, 10, 80);
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 90);
  doc.save(`Comprobante_${tipo}_${Date.now()}.pdf`);
}

// ------------------------------
// BOTONES DE TRANSACCIÓN
// ------------------------------
document.getElementById("btnDeposito").addEventListener("click", () => {
  swal("Depósito", "Ingrese el monto a depositar:", {
    content: "input",
    buttons: ["Cancelar", "Depositar"]
  }).then((valor) => {
    if (!valor) return;
    const monto = parseFloat(valor);
    if (isNaN(monto) || monto <= 0) {
      swal("Error", "Ingrese un monto válido.", "error");
      return;
    }
    const nuevoSaldo = usuario.saldo + monto;
    actualizarSaldo(nuevoSaldo);
    registrarTransaccion("Depósito", monto);
    swal("Depósito exitoso", `Nuevo saldo: $${nuevoSaldo.toFixed(2)}`, "success");
  });
});

document.getElementById("btnRetiro").addEventListener("click", () => {
  swal("Retiro", "Ingrese el monto a retirar:", {
    content: "input",
    buttons: ["Cancelar", "Retirar"]
  }).then((valor) => {
    if (!valor) return;
    const monto = parseFloat(valor);
    if (isNaN(monto) || monto <= 0 || monto > usuario.saldo) {
      swal("Error", "Monto no válido o saldo insuficiente.", "error");
      return;
    }
    const nuevoSaldo = usuario.saldo - monto;
    actualizarSaldo(nuevoSaldo);
    registrarTransaccion("Retiro", monto);
    swal("Retiro exitoso", `Nuevo saldo: $${nuevoSaldo.toFixed(2)}`, "success");
  });
});

document.getElementById("btnPago").addEventListener("click", () => {
  swal("Pago de Servicio", "Ingrese monto del pago:", {
    content: "input",
    buttons: ["Cancelar", "Pagar"]
  }).then((valor) => {
    if (!valor) return;
    const monto = parseFloat(valor);
    if (isNaN(monto) || monto <= 0 || monto > usuario.saldo) {
      swal("Error", "Monto no válido o saldo insuficiente.", "error");
      return;
    }
    const nuevoSaldo = usuario.saldo - monto;
    actualizarSaldo(nuevoSaldo);
    registrarTransaccion("Pago de Servicio", monto);
    swal("Pago realizado", `Nuevo saldo: $${nuevoSaldo.toFixed(2)}`, "success");
  });
});

document.getElementById("btnConsulta").addEventListener("click", () => {
  swal("Saldo Actual", `Tu saldo actual es de: $${usuario.saldo.toFixed(2)}`, "info");
});

// Salir de sesión
document.getElementById("btnSalir").addEventListener("click", () => {
  swal({
    title: "¿Deseas cerrar sesión?",
    icon: "warning",
    buttons: ["Cancelar", "Sí, salir"],
    dangerMode: true
  }).then((confirmado) => {
    if (confirmado) {
      localStorage.clear();
      swal("Sesión cerrada", "Hasta pronto, entrenador Pokémon.", "success");
      setTimeout(() => (window.location.href = "index.html"), 1500);
    }
  });
});

// -------------------------------------------
// NUEVO BOTÓN: Generar PDF con todas las transacciones
// -------------------------------------------
document.getElementById("btnPDF").addEventListener("click", () => {
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

  if (transacciones.length === 0) {
    swal("Sin transacciones", "No hay movimientos para generar un comprobante.", "info");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Pokémon Bank - Comprobante de Transacciones", 10, 20);
  doc.setFontSize(12);
  doc.text(`Cliente: ${usuario.nombre}`, 10, 35);
  doc.text(`Cuenta: ${usuario.cuenta}`, 10, 45);
  doc.text(`Saldo actual: $${usuario.saldo.toFixed(2)}`, 10, 55);
  doc.text(`Fecha de emisión: ${new Date().toLocaleString()}`, 10, 65);

  doc.text("Historial de movimientos:", 10, 80);

  let y = 90;
  transacciones.forEach((t, i) => {
    const linea = `${i + 1}. ${t.tipo} - $${t.monto.toFixed(2)} - ${t.fecha}`;
    doc.text(linea, 10, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`Historial_Transacciones_${usuario.nombre}.pdf`);
});
