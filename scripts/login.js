document
  .getElementById("inicio-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Submit button clicked");
    login();
  });
  
  function login() {
    const data = {
      nombre_usuario: document.getElementById("nombre_usuario").value,
      contrasena: document.getElementById("contrasena").value,
    };
  
    fetch("http://127.0.0.1:5000/usuarios/iniciar_sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            // Al iniciar sesión con éxito, guarda la imagen de perfil, el nombre de usuario y el id_usuario en localStorage
            localStorage.setItem("imagen_perfil", "../assets/profile_images/" + data.imagen_perfil); // Agrega la ruta completa
            localStorage.setItem("nombre_usuario", data.nombre_usuario);
            localStorage.setItem("id_usuario", data.id_usuario);
  
            // Redireccionar a la página de perfil
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