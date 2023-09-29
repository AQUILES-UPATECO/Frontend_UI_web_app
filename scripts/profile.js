//  Obtener referencia al campo de entrada y a la imagen previa
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

document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombreUsuario = document.getElementById('nombre-usuario').value;
    var contrasena = document.getElementById('contrasena').value;
    var correoElectronico = document.getElementById('correo-electronico').value;
    var imagenPerfilInput = document.getElementById('imagen-perfil');
    
    var formData = new FormData();
    formData.append('nombre_usuario', nombreUsuario);
    formData.append('contrasena', contrasena);
    formData.append('correo_electronico', correoElectronico);
    formData.append('imagen_perfil', imagenPerfilInput.files[0]);

    fetch('http://127.0.0.1:5000/usuarios/registrar', {
        method: 'POST',
        body: formData,
        credentials: "include",
    })
    .then(function(response) {
        if (response.ok) {
            alert('Usuario registrado con éxito');
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = 'login.html';
        } else {
            alert('Error al registrar usuario');
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});