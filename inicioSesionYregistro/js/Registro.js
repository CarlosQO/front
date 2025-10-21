// Espera a que se cargue todo el documento
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formularioRegistro");

  // 💬 Función para mostrar mensajes simples
  function mostrarMensaje(texto, tipo = "danger") {
    alert(texto);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const inputs = form.querySelectorAll("input");

    // Verificar si todos los campos están validados correctamente
    let todoCorrecto = true;
    inputs.forEach(input => {
      if (!input.classList.contains("is-valid")) {
        todoCorrecto = false;
      }
    });

    if (!todoCorrecto) {
      alert("⚠️ Por favor revisa los campos, hay errores en el formulario.");
      return;
    }

    // Capturamos los datos del formulario
    const usuario = document.getElementById("nombreUsuario").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const confirmar = document.getElementById("confirmar").value;

    const datosUsuario = {
      username: usuario,
      email: correo,
      first_name: nombre,
      last_name: apellido,
      phone: telefono,
      address: direccion,
      password: contraseña,
      password2: confirmar,
    };

    try {
      const respuesta = await fetch("http://127.0.0.1:8001/api/usuarios/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosUsuario),
      });

      const resultado = await respuesta.json();
      console.log(resultado);

      // ✅ Usamos respuesta.ok, no resultado.ok
      if (respuesta.ok) {
        mostrarMensaje("✅ Registro exitoso. Redirigiendo...", "success");
        setTimeout(() => (window.location.href = "InicioSesion.html"), 2000);
      } else {
        mostrarMensaje(resultado.mensaje || "No se pudo completar el registro.", "danger");
      }

    } catch (error) {
      console.error(error);
      mostrarMensaje("❌ Error al conectar con el servidor.", "danger");
    }
  });
});
