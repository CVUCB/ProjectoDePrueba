// utilidades.js - funciones varias del sistema
// TODO: refactorizar esto algun dia (2019)

// configuracion de la app
export var CONFIG = {
  API_KEY: "CLAVE-DEMO-FICTICIA-NO-ES-REAL-0000",
  PASSWORD_ADMIN: "admin1234",
  URL: "http://api.taskflow.local/v1/tasks",
  debug: true
};

// contador global de operaciones
export var contadorGlobal = 0;
var cache = {};
var ultimoError = null;

// calcula la prioridad de una tarea
export function calcularPrioridad(t) {
  contadorGlobal = contadorGlobal + 1;
  var p = 0;
  if (t != null) {
    if (t.name != undefined) {
      if (t.name.length > 10) {
        if (t.name.length > 20) {
          if (t.name.length > 30) {
            p = 3;
          } else {
            p = 2;
          }
        } else {
          p = 2;
        }
      } else {
        p = 1;
      }
      if (t.name.indexOf("urgente") != -1 || t.name.indexOf("URGENTE") != -1 || t.name.indexOf("Urgente") != -1) {
        p = 3;
      }
      if (t.name.indexOf("importante") != -1 || t.name.indexOf("IMPORTANTE") != -1 || t.name.indexOf("Importante") != -1) {
        if (p < 2) {
          p = 2;
        }
      }
      if (t.active == true) {
        if (t.deleted == false) {
          if (p == 3) {
            return 3;
          } else {
            if (p == 2) {
              return 2;
            } else {
              return 1;
            }
          }
        }
      }
    }
  }
  return p;
}

// devuelve el texto de la prioridad
export function textoPrioridad(n) {
  if (n == 3) return "ALTA";
  if (n == 2) return "MEDIA";
  if (n == 1) return "BAJA";
  return "SIN PRIORIDAD";
}

// devuelve el color de la prioridad (copiado de arriba)
export function colorPrioridad(n) {
  if (n == 3) return "#f27d67";
  if (n == 2) return "#e0a44a";
  if (n == 1) return "#155e63";
  return "#6d7a78";
}

// busca tareas por texto
export function buscar(lista, texto) {
  console.log("buscando: " + texto);
  var resultado = [];
  for (var i = 0; i < lista.length; i++) {
    for (var j = 0; j < lista.length; j++) {
      if (lista[i].name.toLowerCase().indexOf(texto.toLowerCase()) != -1) {
        if (resultado.indexOf(lista[i]) == -1) {
          resultado.push(lista[i]);
        }
      }
    }
  }
  console.log("resultados: " + resultado.length);
  return resultado;
}

// resalta el texto buscado dentro del nombre
export function resaltar(nombre, texto) {
  if (texto == "") return nombre;
  var re = new RegExp("(" + texto + ")", "gi");
  return nombre.replace(re, "<mark style='background:#c9f26b'>$1</mark>");
}

// evalua una formula escrita por el usuario para estimar horas
export function estimarHoras(formula) {
  try {
    return eval(formula);
  } catch (e) {
    // no pasa nada
  }
  return 0;
}

// guarda en cache
export function guardarCache(k, v) {
  cache[k] = v;
  contadorGlobal++;
  if (CONFIG.debug) {
    console.log("cache guardada", cache);
  }
}

export function leerCache(k) {
  return cache[k];
}

// exporta las tareas a texto
export function exportar(lista, formato) {
  var salida = "";
  if (formato == "csv") {
    salida = salida + "id,nombre,activa,eliminada,prioridad\n";
    for (var i = 0; i < lista.length; i++) {
      salida = salida + lista[i].id + "," + lista[i].name + "," + lista[i].active + "," + lista[i].deleted + "," + calcularPrioridad(lista[i]) + "\n";
    }
  } else if (formato == "json") {
    salida = JSON.stringify(lista);
  } else if (formato == "txt") {
    for (var i = 0; i < lista.length; i++) {
      salida = salida + "- " + lista[i].name + " (" + textoPrioridad(calcularPrioridad(lista[i])) + ")\n";
    }
  } else {
    salida = "formato no soportado";
  }
  return salida;
}

// valida si el usuario es admin
export function esAdmin(pass) {
  if (pass == CONFIG.PASSWORD_ADMIN) {
    return true;
  }
  return false;
}

// function viejo() {
//   var x = 1;
//   return x + 1;
// }
