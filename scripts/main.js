document.addEventListener("DOMContentLoaded", function () {
  const profileImage = localStorage.getItem("imagen_perfil");
  const username = localStorage.getItem("nombre_usuario");

  if (profileImage) {
    // Actualizar la imagen de perfil si está disponible
    const imagenPerfilElement = document.getElementById("imagen_perfil");
    imagenPerfilElement.src = profileImage;
  }

  if (username) {
    // Actualizar el nombre de usuario si está disponible
    const nombreUsuarioElement = document.getElementById("nombre_usuario");
    nombreUsuarioElement.textContent = username;
  }
});
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
// Al hacer click en Mis servidores se cargan Todos los servidores creados
// y suscriptos por el usuario que inicio sesion.
const cargarServidoresBtn = document.querySelector(".server-icon");

cargarServidoresBtn.addEventListener("click", () => {
  const idUsuario = localStorage.getItem("id_usuario");

  if (idUsuario) {
    // Construye la URL del endpoint con el id_usuario
    const url = `http://127.0.0.1:5000/servidores/${idUsuario}`;

    // Realiza la solicitud GET a la URL construida
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes procesar los datos de los servidores y mostrarlos en el div de main-content
        const mainContentDiv = document.querySelector(".main-content");

        // Vacía cualquier contenido anterior en main-content
        mainContentDiv.innerHTML = "";

        // Oculta el .canales-sidebar al cargar los servidores
        const canalesSidebar = document.querySelector(".canales-sidebar");
        canalesSidebar.style.display = "none";

        data.forEach((servidor) => {
          // Crea un contenedor div para el servidor
          const servidorDiv = document.createElement("div");
          servidorDiv.classList.add("servidor");

          // Crea un contenedor interno para la información del servidor
          const servidorInfoDiv = document.createElement("div");
          servidorInfoDiv.classList.add("servidor-info");
          servidorInfoDiv.innerHTML = `
            <h3>${servidor.nombre_servidor}</h3>
            <p>${servidor.descripcion_servidor}</p>
          `;

          // Agregar el botón "Ir a Canales" al servidorInfoDiv
          const irACanalesBtn = document.createElement("button");
          irACanalesBtn.textContent = "Ir a Canales";
          irACanalesBtn.addEventListener("click", () => {
            // Vacía el contenido de main-content al hacer clic en el botón "Ir a Canales"
            mainContentDiv.innerHTML = "";

            // Muestra el .canales-sidebar al hacer clic en el botón "Ir a Canales"
            canalesSidebar.style.display = "block"; // Cambia el estilo para mostrarlo

            // Ahora, haz una solicitud GET a la ruta de canales para obtener los canales del servidor
            const idServidor = servidor.id_servidor;
            const canalesUrl = `http://127.0.0.1:5000/canales/${idServidor}`;

            fetch(canalesUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((canalesData) => {
                // Aquí puedes procesar los datos de los canales y mostrarlos en .canales-container
                const canalesContainer = document.querySelector(".canales-container");
                canalesContainer.innerHTML = ""; // Vacía cualquier contenido anterior

                // Itera sobre los canales y crea elementos HTML para mostrarlos
                canalesData.forEach((canal) => {
                  // Crea un elemento div para mostrar cada canal
                  const canalDiv = document.createElement("div");
                  canalDiv.classList.add("canal");

                  // Agrega el nombre y la descripción del canal como contenido
                  canalDiv.innerHTML = `
                    <h4>${canal.nombre_canal}</h4>
                    
                  `;

                  // Agrega el elemento del canal al contenedor de canales
                  canalesContainer.appendChild(canalDiv);
                });
              })
              .catch((error) => {
                console.error("Error al cargar los canales:", error);
              });
          });

          // Agregar el contenedor interno al contenedor del servidor
          servidorInfoDiv.appendChild(irACanalesBtn);

          // Agregar el contenedor interno al contenedor del servidor
          servidorDiv.appendChild(servidorInfoDiv);

          // Agregar un evento de clic al contenedor para futuras interacciones
          servidorDiv.addEventListener("click", () => {
            // Aquí puedes definir lo que sucede cuando se hace clic en el servidor
            // Por ejemplo, redirigir a los canales del servidor
            // window.location.href = `URL_DEL_SERVIDOR/${servidor.id_servidor}`; // Reemplaza con la URL adecuada
          });

          // Agregar el elemento del servidor al div de main-content
          mainContentDiv.appendChild(servidorDiv);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los servidores:", error);
      });
  } else {
    // Maneja el caso en que el id_usuario no esté definido en localStorage
    console.error("El id_usuario no está definido en localStorage.");
  }
});

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//TRAE TODOS LOS SERVIDORES AL HACER CLICK EN SERVER-ICON2
const cargarTodosLosServidoresBtn = document.querySelector(".server-icon2");

cargarTodosLosServidoresBtn.addEventListener("click", () => {
  // Realiza una solicitud al endpoint para obtener todos los servidores
  fetch("http://127.0.0.1:5000/servidores/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes procesar los datos de los servidores y mostrarlos en el div de main-content
      const mainContentDiv = document.querySelector(".main-content");
      mainContentDiv.innerHTML = ""; // Limpia cualquier contenido anterior

      data.forEach((servidor) => {
        // Crea un contenedor div para el servidor
        const servidorDiv = document.createElement("div");
        servidorDiv.classList.add("servidor");

        // Crea elementos HTML para mostrar la información del servidor
        const servidorItemsDiv = document.createElement("div");
        servidorItemsDiv.classList.add("servidor-items");
        servidorItemsDiv.innerHTML = `
          <h3>${servidor.nombre_servidor}</h3>
          <p>${servidor.descripcion_servidor}</p>
        `;

        // Agregar botón de suscripción
        const suscribirseBtn = document.createElement("button");
        suscribirseBtn.textContent = "Suscribirse";
        suscribirseBtn.addEventListener("click", () => {
          // Obtener el id_servidor del servidor seleccionado
          const idServidor = servidor.id_servidor;

          // Obtener el id_usuario del almacenamiento local
          const idUsuario = localStorage.getItem("id_usuario");

          // Comprobar si idServidor e idUsuario son válidos
          if (idServidor && idUsuario) {
            // Crear un objeto con los datos que deseas enviar al servidor en formato JSON
            const data = {
              id_usuario: idUsuario,
              id_servidor: idServidor,
            };

            // Realizar una solicitud al servidor para suscribir al usuario al servidor seleccionado
            fetch(`http://127.0.0.1:5000/servidores/suscribir/${idUsuario}/${idServidor}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data), // Enviar el objeto JSON en el cuerpo de la solicitud
              mode: 'cors', // Asegúrate de habilitar CORS
            })
              .then((response) => {
                if (response.status === 200) {
                  // El usuario se suscribió con éxito
                  console.log('Usuario suscrito al servidor');
                  alert('Te Has Suscrito Con Exito, Ahora Ve a "MIS SERVIDORES"');

                  // Mostrar el mensaje de éxito
                  const mensajeExitoDiv = document.getElementById("mensaje-exito");
                  mensajeExitoDiv.style.display = "block";

                  // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
                  setTimeout(() => {
                    mensajeExitoDiv.style.display = "none";
                  }, 3000);
                } else {
                  // Manejar errores si es necesario
                  alert("Ya estas suscrito a este servidor");
                }
              })
              .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
              });
          } else {
            // Manejar el caso en el que idServidor o idUsuario no estén definidos
            console.error("El id_servidor o id_usuario no están definidos.");
          }

          // Luego, puedes redirigir al usuario a la página de suscripción o realizar otras acciones
          // ...

          // Si deseas redirigir al usuario, puedes hacerlo de la siguiente manera:
          // window.location.href = "ruta_a_la_pagina_de_suscripcion.html";
        });

        // Agrega el botón de suscribirse al servidorItemsDiv
        servidorItemsDiv.appendChild(suscribirseBtn);

        // Agrega el elemento del servidor al div de main-content
        mainContentDiv.appendChild(servidorItemsDiv);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
});

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//CREAR SERVIDORES
const addServerIcon = document.querySelector(".add-server-icon");

addServerIcon.addEventListener("click", () => {
  // Crear un formulario dinámico
  const form = document.createElement("form");
  form.classList.add("custom-form"); // Agrega una clase CSS al formulario

  // Agregar título al formulario
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Crea un Servidor"; // Agrega el texto del título
  form.appendChild(formTitle); // Agrega el título al formulario

  // Agregar campos al formulario
  const nombreServidorInput = document.createElement("input");
  nombreServidorInput.setAttribute("type", "text");
  nombreServidorInput.setAttribute("placeholder", "Nombre del servidor");

  const descripcionServidorInput = document.createElement("input");
  descripcionServidorInput.setAttribute("type", "text");
  descripcionServidorInput.setAttribute("placeholder", "Descripción del servidor");

  const crearServidorBtn = document.createElement("button");
  crearServidorBtn.textContent = "Crear";

  // Agregar campos y botón al formulario
  form.appendChild(nombreServidorInput);
  form.appendChild(descripcionServidorInput);
  form.appendChild(crearServidorBtn);

  // Agregar el formulario al DOM (por ejemplo, al div main-content)
  const mainContentDiv = document.querySelector(".main-content");
  mainContentDiv.innerHTML = ""; // Limpia cualquier contenido anterior
  mainContentDiv.appendChild(form);

  // Manejar el evento de envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    const nombreServidor = nombreServidorInput.value;
    const descripcionServidor = descripcionServidorInput.value;

    // Obtener el id del usuario actual desde el localStorage
    const idUsuario = localStorage.getItem("id_usuario");

    // Enviar los datos al servidor para crear el servidor
    fetch("http://127.0.0.1:5000/servidores/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_servidor: nombreServidor,
        descripcion_servidor: descripcionServidor,
        id_usuario: idUsuario, // Usar el id del usuario actual
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          // El servidor se creó con éxito
          // Guardar el id_usuario_creador en el localStorage
          localStorage.setItem("id_usuario_creador", idUsuario);

          // Puedes tomar acciones adicionales aquí, como actualizar la lista de servidores
          alert("Servidor creado con éxito");
          // Limpia los campos del formulario después de crear el servidor
          nombreServidorInput.value = "";
          descripcionServidorInput.value = "";
        } else {
          // Manejar errores si es necesario
          console.error("Error al crear el servidor");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  });
});

//---------------------------------------------------------------------------------------
// Función para cargar y mostrar los canales
function cargarYMostrarCanales() {
  // Obtener el ID del servidor actual (debes implementar la lógica para obtenerlo)
  const idServidorActual = obtenerIdServidorActual();

  // Obtener el contenedor de canales
  const canalesContainer = document.querySelector(".canales-container");

  // Obtener el ID del usuario actual desde el localStorage
  const idUsuario = localStorage.getItem("id_usuario");

  // Realizar una solicitud GET al servidor para obtener la lista de canales
  const canalesUrl = `http://127.0.0.1:5000/canales/${idServidorActual}`;

  fetch(canalesUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((canalesData) => {
      // Limpiar cualquier contenido anterior en el contenedor de canales
      canalesContainer.innerHTML = "";

      // Iterar sobre los datos de los canales y crear elementos HTML para mostrarlos
      canalesData.forEach((canal) => {
        // Crear un elemento div para mostrar cada canal
        const canalDiv = document.createElement("div");
        canalDiv.classList.add("canal");

        // Agregar el nombre del canal como contenido
        canalDiv.innerHTML = `
          <h4>${canal.nombre_canal}</h4>
        `;

        // Agregar el elemento del canal al contenedor de canales
        canalesContainer.appendChild(canalDiv);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los canales:", error);
    });
}
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
const addCanalesIcon = document.querySelector(".add-canales-icon");

addCanalesIcon.addEventListener("click", () => {
  // Crear un formulario dinámico
  const form = document.createElement("form");
  form.classList.add("custom-form"); // Agrega una clase CSS al formulario

  // Agregar título al formulario
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Crear un Canal"; // Agrega el texto del título
  form.appendChild(formTitle); // Agrega el título al formulario

  // Agregar campos al formulario
  const nombreCanalInput = document.createElement("input");
  nombreCanalInput.setAttribute("type", "text");
  nombreCanalInput.setAttribute("placeholder", "Nombre del canal");

  const descripcionCanalInput = document.createElement("input");
  descripcionCanalInput.setAttribute("type", "text");
  descripcionCanalInput.setAttribute("placeholder", "Descripción del canal");

  const crearCanalBtn = document.createElement("button");
  crearCanalBtn.textContent = "Crear";

  // Agregar campos y botón al formulario
  form.appendChild(nombreCanalInput);
  form.appendChild(descripcionCanalInput);
  form.appendChild(crearCanalBtn);

  // Agregar el formulario al DOM (por ejemplo, al div .main-content)
  const mainContentDiv = document.querySelector(".main-content");
  mainContentDiv.innerHTML = ""; // Limpia cualquier contenido anterior
  mainContentDiv.appendChild(form);

  // Manejar el evento de envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    const nombreCanal = nombreCanalInput.value;
    const descripcionCanal = descripcionCanalInput.value;

    // Obtener el ID del servidor actual (debes implementar la lógica para obtenerlo)
    const idServidorActual = obtenerIdServidorActual();

    // Obtener el ID del usuario actual desde el localStorage
    const idUsuario = localStorage.getItem("id_usuario");

    // Enviar los datos al servidor para crear el canal
    fetch("http://127.0.0.1:5000/canales/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_canal: nombreCanal,
        descripcion_canal: descripcionCanal,
        id_servidor: idServidorActual, // Usar el ID del servidor actual
        id_usuario: idUsuario, // Usar el ID del usuario actual
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          // El canal se creó con éxito
          // Puedes tomar acciones adicionales aquí, como actualizar la lista de canales del servidor
          alert("Canal creado con éxito");

          // Llama a la función para cargar y mostrar los canales actualizados
          cargarYMostrarCanales();
        } else {
          // Manejar errores si es necesario
          console.error("Error al crear el canal");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  });
});

// Función para obtener el ID del servidor actual (debes implementarla)
function obtenerIdServidorActual() {
  // Implementa la lógica para obtener el ID del servidor actual aquí
  // Por ejemplo, puedes obtenerlo de algún elemento del DOM o de tu aplicación
  // Si ya tienes el ID del servidor actual almacenado en alguna parte, puedes retornarlo
  return 4; // Ejemplo: ID del servidor actual
}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  
  // Obtener referencia al elemento canales-salir
  const canalesSalir = document.getElementById("canales-salir");

  // Agregar un event listener para manejar el click
  canalesSalir.addEventListener("click", () => {
    console.log("Clic en canales-salir"); // prueba de boton
    // Ocultar el .canales-sidebar
    const canalesSidebar = document.querySelector(".canales-sidebar");
    canalesSidebar.style.display = "none";

    // Limpiar el .main-content
    const mainContentDiv = document.querySelector(".main-content");
    mainContentDiv.innerHTML = ""; // Limpia cualquier contenido presente
  });
});

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//-----------------------------CIERRE DE SESION----------------------------------------------

// Obtén el elemento con el id "cerrar-sesion"
const cerrarSesionButton = document.getElementById("cerrar-sesion");

// Agrega un evento click al botón de cerrar sesión
cerrarSesionButton.addEventListener("click", () => {
  // Limpia los datos del localStorage
  localStorage.clear();

  // Redirige la página a "login.html"
  window.location.href = "login.html";
});
