const formulario = document.getElementById("formularioRegistro");
const alerta = document.getElementById("alerta");

// Expresiones regulares básicas
const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formatoTelefono = /^3\d{9}$/;
const formatoContraseña = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Mostrar mensajes en pantalla
function mostrarMensaje(texto, tipo = "danger") {
  alerta.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${texto}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

// Validar y enviar formulario
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener valores
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const contraseña = document.getElementById("contraseña").value;
  const confirmar = document.getElementById("confirmar").value;

  // Validaciones
  if (!nombre) {
    mostrarMensaje("Por favor, ingresa tu nombre.");
    return;
  }

  if (!formatoCorreo.test(correo)) {
    mostrarMensaje("El correo no tiene un formato válido.");
    return;
  }

  if (telefono && !formatoTelefono.test(telefono)) {
    mostrarMensaje("El número de teléfono no es válido.");
    return;
  }

  if (!formatoContraseña.test(contraseña)) {
    mostrarMensaje(
      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número."
    );
    return;
  }

  if (contraseña !== confirmar) {
    mostrarMensaje("Las contraseñas no coinciden.");
    return;
  }

  // Datos listos para enviar
  const datosUsuario = {
    nombre,
    correo,
    telefono,
    contraseña,
  };

  try {
    // Enviar al servidor
    const respuesta = await fetch("http://localhost:5000/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosUsuario),
    });

    const resultado = await respuesta.json();

    if (resultado.exito) {
      mostrarMensaje("Registro exitoso", "success");
      setTimeout(() => (window.location.href = "InicioSesion.html"), 2000);
    } else {
      mostrarMensaje(resultado.mensaje || "No se pudo completar el registro.");
    }
  } catch (error) {
    console.error("Error al registrar:", error);
    mostrarMensaje("Error al conectar con el servidor.");
  }
});
