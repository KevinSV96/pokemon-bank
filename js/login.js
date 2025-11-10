// Datos de usuario predeterminados
const usuario = {
  nombre: "Ash Ketchum",
  cuenta: "0987654321",
  pin: "1234",
  saldo: 500.00
};

// Evento del botón de login
document.getElementById("btnLogin").addEventListener("click", function() {
  const pinIngresado = document.getElementById("pin").value.trim();

  if (pinIngresado === "") {
    swal("Campo vacío", "Por favor ingrese su PIN.", "warning");
    return;
  }

if (pinIngresado === usuario.pin) {
  localStorage.setItem("usuario", JSON.stringify(usuario));

  swal({
    title: "¡Bienvenido!",
    text: `Hola ${usuario.nombre}, accediendo a tu cuenta...`,
    icon: "success",
    buttons: false,
    timer: 1500
  }).then(() => {
    window.location.href = "dashboard.html"; // ✅ propiedad correcta
  });
} else {
  swal("PIN incorrecto", "El PIN ingresado no coincide. Intente nuevamente.", "error");
}
});
