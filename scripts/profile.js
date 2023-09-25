// Obtener referencia al campo de entrada y a la imagen previa
const inputImagen = document.getElementById('imagen-perfil');
const imagenPrevia = document.getElementById('imagen-previa');

// Escuchar el evento de cambio en el campo de entrada
inputImagen.addEventListener('change', function() {
    // Verificar si se seleccionó un archivo
    if (inputImagen.files && inputImagen.files[0]) {
        const lector = new FileReader();

        // Cuando se carga la imagen, mostrarla en la vista previa
        lector.onload = function(e) {
            imagenPrevia.src = e.target.result;
            imagenPrevia.style.display = 'block'; // Mostrar la imagen previa
        };

        // Leer el archivo seleccionado como una URL de datos
        lector.readAsDataURL(inputImagen.files[0]);
    }
});
//------------------------------------------------------------------------------------------
document.getElementById('registro-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos
  var nombreUsuario = document.getElementById('nombre-usuario').value;
  var contrasena = document.getElementById('contrasena').value;
  var correoElectronico = document.getElementById('correo-electronico').value;

  // Crear un objeto con los datos a enviar
  var userData = {
      "nombre_usuario": nombreUsuario,
      "contrasena": contrasena,
      "correo_electronico": correoElectronico,
      "imagen_perfil": ""
  };

  // Realizar una solicitud POST a la URL del servidor
  fetch('http://127.0.0.1:5000/usuarios/registrar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(function(response) {
      if (response.ok) {
          alert('Usuario registrado con éxito');
          // Aquí puedes redirigir al usuario a otra página si lo deseas
      } else {
          alert('Error al registrar usuario');
      }
  })
  .catch(function(error) {
      console.error('Error:', error);
  });
});