// Buscador
const buscador = document.querySelector('#buscador');
const clear = document.querySelector('#clear'); // Seleccionar el elemento #clear
buscador.addEventListener('keyup', function() {
  const busqueda = this.value.toLowerCase().replace(/\[.*?\]/g, '').trim();
  if (busqueda) {
    clear.style.display = 'block';
    clear.addEventListener('click', function() {
      buscador.value = '';
      clear.style.display = 'none';
      buscador.dispatchEvent(new KeyboardEvent('keyup'));
    });
  } else {
    clear.style.display = 'none';
  }

  const filas = document.querySelectorAll('.tabla tr.d');
  let juegosNuevos = [];
  let otrosJuegos = [];
  filas.forEach(function(fila) {
    // Limpiar el texto del juego para omitir el texto entre corchetes
    const juego = fila.querySelector('td:nth-child(2)').textContent.toLowerCase().replace(/\[.*?\]/g, '').trim();
    if (busqueda === '') {
      if (fila.querySelector('td:nth-child(2) div.new')) {
        juegosNuevos.push(fila);
      } else {
        otrosJuegos.push(fila);
      }
    } else if (juego.indexOf(busqueda) !== -1) {
      if (fila.querySelector('td:nth-child(2) div.new')) {
        juegosNuevos.push(fila);
      } else {
        otrosJuegos.push(fila);
      }
    } else {
      fila.style.display = 'none';
    }
  });

  juegosNuevos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  otrosJuegos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  filas.forEach(fila => fila.style.display = 'none');
  juegosNuevos.concat(otrosJuegos).forEach(fila => fila.style.display = '');
  const tbody = document.querySelector('.tabla tbody');
  juegosNuevos.concat(otrosJuegos).forEach(fila => tbody.appendChild(fila));
  enumerarJuegos();
});


function ordenarYEnumerarJuegos() {
  const filas = document.querySelectorAll('.tabla tr.d');
  let juegos = Array.from(filas);
  juegos.sort((a, b) => {
    const esNuevoA = a.querySelector('td:nth-child(2) div.new') !== null;
    const esNuevoB = b.querySelector('td:nth-child(2) div.new') !== null;
    if (esNuevoA && !esNuevoB) {
      return -1;
    } else if (!esNuevoA && esNuevoB) {
      return 1;
    } else {
      const juegoA = a.querySelector('td:nth-child(2)').textContent.replace(/^\d+\. /, '');
      const juegoB = b.querySelector('td:nth-child(2)').textContent.replace(/^\d+\. /, '');
      return juegoA.localeCompare(juegoB);
    }
  });
  let juegosOrdenadosAlfabeticamente = Array.from(juegos);
  juegosOrdenadosAlfabeticamente.sort((a, b) => {
    const juegoA = a.querySelector('td:nth-child(2)').textContent.replace(/^\d+\. /, '');
    const juegoB = b.querySelector('td:nth-child(2)').textContent.replace(/^\d+\. /, '');
    return juegoA.localeCompare(juegoB);
  });
  juegos.forEach(fila => {
    const celdaNombre = fila.querySelector('td:nth-child(2)');
    let span = celdaNombre.querySelector('span.enumeracion');
    if (!span) {
      span = document.createElement('span');
      span.classList.add('enumeracion');
      celdaNombre.insertBefore(span, celdaNombre.firstChild);
    }
    const index = juegosOrdenadosAlfabeticamente.indexOf(fila);
    const numero = (index + 1).toString().padStart(3, '0');
    span.textContent = numero + '. ';
  });
  const tbody = document.querySelector('.tabla tbody');
  juegos.forEach(fila => tbody.appendChild(fila));
}

window.addEventListener('load', function() {
  ordenarYEnumerarJuegos();
});

window.addEventListener('load', function() {
  ordenarYEnumerarJuegos();
});


function ordenarPorImagenNew() {
  const filas = document.querySelectorAll('.tabla tr.d');
  let juegos = Array.from(filas);
  juegos.sort((a, b) => {
    const esNuevoA = a.querySelector('td:nth-child(2) div.new') !== null;
    const esNuevoB = b.querySelector('td:nth-child(2) div.new') !== null;
    if (esNuevoA && !esNuevoB) {
      return -1;
    } else if (!esNuevoA && esNuevoB) {
      return 1;
    } else {
      return 0;
    }
  });
  const tbody = document.querySelector('.tabla tbody');
  juegos.forEach(fila => tbody.appendChild(fila));
}

window.addEventListener('load', function() {
  ordenarYEnumerarJuegos();
  ordenarPorImagenNew();
});

const backToTopButton = document.querySelector('#back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Obtener el elemento input del interruptor
const toggleImages = document.querySelector('#btn-switch');

// Agregar un controlador de eventos para el cambio del interruptor
toggleImages.addEventListener('change', function() {
  // Obtener todas las imágenes de los juegos
  const gameImages = document.querySelectorAll('.icon');
  
  // Mostrar u ocultar las imágenes dependiendo del estado del interruptor
  if (this.checked) {
    gameImages.forEach(function(image) {
      // Cargar la imagen desde el atributo data-src
      image.src = image.getAttribute('data-src');
      image.style.display = 'inline';
    });
  } else {
    gameImages.forEach(function(image) {
      image.style.display = 'none';
    });
  }
});

// Obtener todos los botones de agregar juego
const addGameButtons = document.querySelectorAll('.add-game');

// Crear un array para almacenar los juegos seleccionados
let selectedGames = [];

// Agregar un controlador de eventos a cada botón de agregar juego
addGameButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Obtener el nombre del juego
    const gameName = button.closest('tr').querySelector('td:nth-child(2)').textContent;
    
    // Si el juego ya está seleccionado, quitarlo de la lista de juegos seleccionados
    if (selectedGames.includes(gameName)) {
      selectedGames = selectedGames.filter(function(selectedGame) {
        return selectedGame !== gameName;
      });
      
      // Cambiar el texto del botón a "+" y su color a azul oscuro
      button.textContent = '+';
      button.style.backgroundColor = '#310083';
    } else {
      // Si el juego no está seleccionado, agregarlo a la lista de juegos seleccionados
      selectedGames.push(gameName);
      
      // Cambiar el texto del botón a "-" y su color a rojo
      button.textContent = '-';
      button.style.backgroundColor = 'red';
    }
    
    // Deshabilitar o habilitar el botón "Hacer pedido" y "Ver pedido" dependiendo de si hay juegos seleccionados
    const hasSelectedGames = selectedGames.length > 0;
    comprar.disabled = !hasSelectedGames;
    viewOrderButton.disabled = !hasSelectedGames;  // Habilitar o deshabilitar el botón "Ver pedido"
    
    // Actualizar la suma total del costo de los juegos seleccionados
    let totalCosto = 0;
    selectedGames.forEach(function(gameName) {
      const gameRow = Array.from(addGameButtons).find(function(button) {
        return button.closest('tr').querySelector('td:nth-child(2)').textContent === gameName;
      }).closest('tr');
      const gameCost = gameRow.querySelector('td:nth-child(4)').textContent;
      totalCosto += parseInt(gameCost.replace('Mn', ''));
    });
    document.querySelector('#total').textContent = totalCosto + 'Mn';
  });
});

// Obtener el botón de "Ver pedido"
const viewOrderButton = document.querySelector('#ver-pedido');

// Agregar un controlador de eventos al botón "Ver pedido"
viewOrderButton.addEventListener('click', function() {
  // Obtener el elemento ul dentro del popup
  const selectedGamesList = document.querySelector('#selected-games');
  
  // Limpiar la lista de juegos seleccionados
  selectedGamesList.innerHTML = '';

  // Crear la tabla
  const table = document.createElement('table');
  selectedGamesList.appendChild(table);

  // Crear el encabezado de la tabla
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const headerRow = document.createElement('tr');
  thead.appendChild(headerRow);
  ['Icono', 'Nombre', 'Peso', 'Precio'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  // Crear el cuerpo de la tabla
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // Agregar cada juego seleccionado al popup en el orden en que fueron seleccionados
  selectedGames.forEach(function(gameName) {
    const gameRow = Array.from(addGameButtons).find(function(button) {
      return button.closest('tr').querySelector('td:nth-child(2)').textContent.trim() === gameName;
    }).closest('tr');

    const row = document.createElement('tr');
    tbody.appendChild(row);

    // Icono del juego
    const iconCell = document.createElement('td');
    row.appendChild(iconCell);
    const icon = gameRow.querySelector('td:nth-child(2) img').cloneNode(true);
    icon.style.display = 'inline'; // Asegurarse de que el icono se muestre
    icon.src = icon.dataset.src; // Establecer el atributo src del icono para el popup
    iconCell.appendChild(icon);

    // Obtener el nombre del juego excluyendo los elementos 'new' y 'online'
    const nameCellContent = gameRow.querySelector('td:nth-child(2)').cloneNode(true);
    Array.from(nameCellContent.querySelectorAll('.new, .online')).forEach(el => el.remove());
    const cleanGameName = nameCellContent.textContent.replace(/\[.*?\]/g, '').trim();

    // Nombre del juego
    const nameCell = document.createElement('td');
    row.appendChild(nameCell);
    nameCell.textContent = cleanGameName;

    // Peso del juego
    const weightCell = document.createElement('td');
    row.appendChild(weightCell);
    weightCell.textContent = gameRow.querySelector('td:nth-child(3)').textContent;

    // Precio del juego
    const priceCell = document.createElement('td');
    row.appendChild(priceCell);
    priceCell.textContent = gameRow.querySelector('td:nth-child(4)').textContent;
  });

    //Mostrar Tamaño total de los juegos seleccionados en el popup
    let tamanoTotal = 0;

    selectedGames.forEach(function(gameName) {
      const row = Array.from(addGameButtons).find(function(button) {
        return button.closest('tr').querySelector('td:nth-child(2)').textContent === gameName;
      }).closest('tr');
      
      const tamano = parseFloat(row.querySelector('td:nth-child(3)').textContent);
      const costo = row.querySelector('td:nth-child(4)').textContent;
  
      total += parseInt(costo);
      tamanoTotal += tamano;
    });
    document.querySelector('#total2').textContent = tamanoTotal + 'Gb';
  
    ///Mostrar Costo total de los juegos seleccionados en el popup
    let totalCosto = 0;
    selectedGames.forEach(function(gameName) {
      const gameRow = Array.from(addGameButtons).find(function(button) {
        return button.closest('tr').querySelector('td:nth-child(2)').textContent === gameName;
      }).closest('tr');
      const gameCost = gameRow.querySelector('td:nth-child(4)').textContent;
      totalCosto += parseInt(gameCost.replace('Mn', ''));
    });
    document.querySelector('#total3').textContent = totalCosto + 'Mn';

  // Mostrar el popup
  document.querySelector('#popup').style.display = 'block';
});

// Agregar un controlador de eventos al botón "Cerrar popup"
document.querySelector('#close-popup').addEventListener('click', function() {
  // Ocultar el popup
  document.querySelector('#popup').style.display = 'none';
});

// Obtener el botón de "Hacer pedido"
const comprar = document.querySelector('#comprar');

// Agregar un controlador de eventos al botón "Hacer pedido"
comprar.addEventListener('click', function() {
  let mensaje = '*Hola, me gustaría grabar en mi PS4 los siguientes juegos:*\n\n';
  let total = 0;
  let tamanoTotal = 0;
  
  selectedGames.forEach(function(gameName) {
    const row = Array.from(addGameButtons).find(function(button) {
      return button.closest('tr').querySelector('td:nth-child(2)').textContent.trim() === gameName;
    }).closest('tr');
    
    // Limpiar el nombre del juego para omitir el texto entre corchetes y las palabras 'new' y 'online'
    const nameCellContent = row.querySelector('td:nth-child(2)').cloneNode(true);
    Array.from(nameCellContent.querySelectorAll('.new, .online')).forEach(el => el.remove());
    const cleanGameName = nameCellContent.textContent.replace(/\[.*?\]/g, '').trim();

    const tamano = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace(/[^0-9.]/g, ''));
    const costo = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace(/[^0-9.]/g, ''));
    
    mensaje += cleanGameName + ' - ' + costo + 'Mn\n\n';
    total += costo;
    tamanoTotal += tamano;
  });
  
  mensaje += '*Total de tamaño*: ' + tamanoTotal.toFixed(2) + ' Gb\n';
  mensaje += '*Total a pagar*: ' + total.toFixed(2) + 'Mn\n';
  
  window.open('https://wa.me/+5359030388?text=' + encodeURIComponent(mensaje));
});

// Obtener todas las filas de la tabla
const rows = document.querySelectorAll('.tabla tr.d');

// Agregar un controlador de eventos a cada fila
rows.forEach(function(row) {
  row.addEventListener('click', function(event) {
    // Obtener el botón "+" de la fila
    const addButton = row.querySelector('.add-game');
    
    // Si el evento no fue disparado por el botón "+", activar el botón "+"
    if (event.target !== addButton) {
      addButton.click();
    }
  });
});

window.addEventListener('load', function() {
  // ... (tu código existente) ...

  // Deshabilitar el botón "Ver pedido" y "Hacer pedido"
  viewOrderButton.disabled = true;
  comprar.disabled = true;
});




function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tablajuegos");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
