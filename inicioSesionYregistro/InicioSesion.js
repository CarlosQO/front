document.getElementById("formu").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim(); // eliminar los espacios
  const clave = document.getElementById("clave").value.trim(); // eliminar los espacios

  // Expresiones regulares
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexClave = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  // Validar correo
  if (!regexCorreo.test(correo)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }

  // Validar contraseña
  if (!regexClave.test(clave)) {
    alert("La contraseña debe tener al menos 6 caracteres y un número.");
    return;
  }

  const datos = { correo, clave };

  try {
    const respuesta = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const resultado = await respuesta.json();

    if (resultado.exito) {
      window.location.href = "inicio.html";
    } else {
      alert(resultado.mensaje);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    alert("Hubo un problema al conectar con el servidor.");
  }
});
