const formulario = document.getElementById("formularioRegistro");
const alerta = document.getElementById("alerta");

// Expresiones regulares básicas
const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formatoNombreApelli = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;
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

  const usuario = document.getElementById("nombreUsuario").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const contraseña = document.getElementById("contraseña").value;
  const confirmar = document.getElementById("confirmar").value;

  // Validaciones
  if (!usuario) {
    mostrarMensaje("Por favor, ingresa tu nombre de usuario.");
    return;
  }

  if (!nombre || !formatoNombreApelli.test(nombre)) {
    mostrarMensaje("Por favor, ingresa tu nombre y no ingrese numeros");
    return;
  }

  if (!apellido || !formatoNombreApelli.test(apellido)) {
    mostrarMensaje("Por favor, ingresa tu apellido y no ingrese numero");
    return;
  }

  if (!direccion) {
    mostrarMensaje("Por favor, ingresa tu dirección.");
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

  const datosUsuario = {
<<<<<<< Updated upstream
    username: usuario,
    email: correo,
    first_name: nombre,
    last_name: apellido,
    phone: telefono,
    address: direccion,
    password: contraseña,
    password2: confirmar,
=======
    
    nombre,
    correo,
    telefono,
    contraseña,
    confirmar,
>>>>>>> Stashed changes
  };
  /*
  {
    "username": "carlos",
    "email": "carlos@example.com",
    "first_name": "carlos",
    "last_name": "Quiñones",
    "phone": "3201234567",
    "address": "Calle 123456",
    "password": "MiClaveSegura123456",
    "password2": "MiClaveSegura123456"
  }
  */

  try {
    // Enviar al servidor
<<<<<<< Updated upstream
    const respuesta = await fetch(
      "http://127.0.0.1:8001/api/usuarios/registro/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario),
      }
    );
=======
    const respuesta = await fetch("http://127.0.0.1:8001/api/usuarios/registro/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosUsuario),
    });
>>>>>>> Stashed changes

    const resultado = await respuesta.json();
    console.log(resultado);

    if (resultado.ok) {
      mostrarMensaje("Registro exitoso", "success");
      setTimeout(() => (window.location.href = "InicioSesion.html"), 2000);
    } else {
      mostrarMensaje(resultado.mensaje || "No se pudo completar el registro.");
    }
  } catch (error) {
    mostrarMensaje("Error al conectar con el servidor.");
  }
});
