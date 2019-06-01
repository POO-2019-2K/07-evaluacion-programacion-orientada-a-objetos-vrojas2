import Tarea from "./Tarea.js";

export default class Tabla {
  constructor(tableLista) {
    this._tableLista = tableLista;
    //localStorage.removeItem("tareas");
    this._tareas = [];
    this._initTables();
  }

  _initTables() {
    let lsContactos = JSON.parse(localStorage.getItem("tareas"));
    if(lsContactos === null){
      return;
    }
    lsContactos.forEach((e, index) => {
      e.dateFin = new Date(e.dateFin);
      this._showInTable(new Tarea(e));
    });
  }

  addContacto(tarea) {
    this._showInTable(tarea);
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
    //console.log(localStorage.getItem("tareas"));
  }

  _showInTable(tarea) {
    let row = this._tableLista.insertRow(-1);

    let cellName = row.insertCell(0);   
    let cellDateFin = row.insertCell(1);
    let cellAge = row.insertCell(2);
    row.insertCell(3);

    cellName.appendChild(document.createTextNode(tarea.name));
    cellDateFin.appendChild(document.createTextNode(tarea.getDateFinAsString()));
    cellAge.appendChild(document.createTextNode(tarea.getTime()));

    let objTarea = {
      name: tarea.name,
      dateFin: tarea.dateFin
    };

    this._tareas.push(objTarea);
    this._addDeleteBtn(row, tarea);
  }
  
  _addDeleteBtn(row, tarea){ 
    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Borrar";
    row.cells[3].innerHTML = ""; 
    btnDelete.className = "btnDelet";
    row.cells[3].appendChild(btnDelete);
    btnDelete.addEventListener("click", () => { 
      this._deleteRow(tarea);
    }); 
  }

  _deleteRow(tarea){
    this._tareas = JSON.parse(localStorage.getItem("tareas"));
    this._tareas.forEach((e, index) => {
      if(e.name === tarea.name) {
        this._tareas.splice(index, 1);
      }
    });
    location.reload();
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
  }

  _compTime(x, y) {
    if (x.dateFin > y.dateFin) {
      return 1;
    }

    if (x.dateFin < y.dateFin) {
      return -1;
    }
    return 0;
  }

  showTime() {
    this._tareas.sort(this._compTime);
    location.reload();
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
  }

  _compAlpha(x, y) {
    if (x.name > y.name) {
      return -1;
    }

    if (x.name < y.name) {
      return 1;
    }
    return 0;
  }

  showAlpha() {
    this._tareas.sort(this._compAlpha);
    location.reload();
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
  }
}