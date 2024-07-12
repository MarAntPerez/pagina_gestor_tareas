const formulario = document.querySelector(".form");

const campoEntrada = document.querySelector(".input");

const listaUl = document.querySelector(".list");

let tarea;

// Obtener los datos del localStorage
let lista = JSON.parse(localStorage.getItem("lista"));

lista.forEach((tarea) => {
  listaTareas(tarea);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  listaTareas();
});

function listaTareas(tarea) {
  // Crear tarea
  let nuevaTarea = campoEntrada.value;

  // localStorage
  if (tarea) {
    nuevaTarea = tarea.nombre;
  }

  // Agregando tarea
  const selectLi = document.createElement("li");

  // localStorage
  if (tarea && tarea.checked) {
    selectLi.classList.add("checked");
  }

  selectLi.innerText = nuevaTarea;
  listaUl.appendChild(selectLi);
  campoEntrada.value = "";

  // Chequear boton en nueva tarea
  const chequearBoton = document.createElement("div");
  chequearBoton.innerHTML = `<i class="fas fa-check-square"></i>`;
  selectLi.appendChild(chequearBoton);

  // Boton borrar en nueva tarea
  const botonBorrar = document.createElement("div");
  botonBorrar.innerHTML = `<i class="fas fa-trash"></i>`;
  selectLi.appendChild(botonBorrar);

  // Funcionalidad de tachar tarea
  chequearBoton.addEventListener("click", () => {
    selectLi.classList.toggle("checked");
    actualizarLocalStorage();
  });

  // Funcionalidad de borrar tarea
  botonBorrar.addEventListener("click", () => {
    selectLi.remove();
    actualizarLocalStorage();
  });

  actualizarLocalStorage();
}

// Funcion Guardar en el localStorage del navegador
function actualizarLocalStorage() {
  const selectLis = document.querySelectorAll("li");

  lista = [];
  selectLis.forEach((selectLi) => {
    lista.push({
      nombre: selectLi.innerText,
      checked: selectLi.classList.contains("checked"),
    });
  });

  localStorage.setItem("lista", JSON.stringify(lista));
}
