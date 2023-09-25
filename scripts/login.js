document
  .getElementById("inicio-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Submit button clicked");
    login();
  });

function login() {
  const data = {
    nombre_usuario: document.getElementById("nombre_usuario").value, // Alineado con tu código de Flask
    contrasena: document.getElementById("contrasena").value,
  };

  fetch("http://127.0.0.1:5000/usuarios/iniciar_sesion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        // Redireccionar a la página de perfil si el inicio de sesión es exitoso
        return response.json().then((data) => {
          window.location.href = "main.html";
        });
      } else {
        return response.json().then((data) => {
          document.getElementById("message").innerHTML = data.message;
        });
      }
    })
    .catch((error) => {
      document.getElementById("message").innerHTML = "Ocurrió un error.";
    });
}
