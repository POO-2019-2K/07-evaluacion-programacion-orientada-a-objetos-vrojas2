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
    console.log(lsContactos)
    if(lsContactos === null){
      return;
    }
    lsContactos.forEach((e, index) => {
      e.dateFin = new Date(e.dateFin);
   
      this._showInTable(new Tarea(e));
    });
  }

  addHomework(tarea) {
    this._showInTable(tarea);
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
    //console.log(localStorage.getItem("tareas"));
  }

  _showInTable(tarea) {
    let row = this._tableLista.insertRow(-1);

    let cellName = row.insertCell(0);   
    let cellDateFin = row.insertCell(1);
    let cellTime = row.insertCell(2);
    row.insertCell(3);
    row.insertCell(4);

    cellName.appendChild(document.createTextNode(tarea.name));
    cellDateFin.appendChild(document.createTextNode(tarea.getDateFinAsString()));
    cellTime.appendChild(document.createTextNode(tarea.getTime()));
    this._addBtnsEditDelete(row,tarea);

    let objTarea = {
      name: tarea.name,
      dateFin: tarea.dateFin
    };

    this._tareas.push(objTarea);
  }

  _deleteRow(tarea) {
    this._tareas = JSON.parse(localStorage.getItem("tareas"));
    this._tareas.forEach((e, index) => {
      if (e.name === tarea.name) {
        this._tareas.splice(index, 1);
      }
    });
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
    location.reload();
  }

  _addBtnsEditDelete(row, tarea) {
    let btnEdit = document.createElement("input");
    btnEdit.type = "button";
    btnEdit.value = "Editar";
    row.cells[3].innerHTML = "";
    btnEdit.className = "btnEdit";
    row.cells[3].appendChild(btnEdit);
    btnEdit.addEventListener("click", () => {
      this._editRow(row, tarea);
    });

    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Borrar";
    row.cells[4].innerHTML = "";
    btnDelete.className = "btnDelete";
    row.cells[4].appendChild(btnDelete);
    btnDelete.addEventListener("click", () => {
      this._deleteRow(tarea);
    });
  }

  _editRow(row, tarea) {
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = tarea.name;
    row.cells[0].innerHTML = "";
    row.cells[0].appendChild(inputName);

    let inputFinDate = document.createElement("input");
    inputFinDate.type = "date";
    inputFinDate.value = tarea.getDiasForDate();
    row.cells[1].innerHTML = "";
    row.cells[1].appendChild(inputFinDate);

    let btnSave = document.createElement("input");
    btnSave.type = "button";
    btnSave.value = "Guardar";
    row.cells[3].innerHTML = "";
    btnSave.className = "btnSave";
    row.cells[3].appendChild(btnSave);
    btnSave.addEventListener("click", () => {
      let x =  inputFinDate.value.split("-") 
      console.log(x)
      let newHomework = {
        name: inputName.value,
        dateFin: new Date( x[0] , x[1] , x[2]) 
      };
      this._saveEditar(row, tarea, newHomework)
    });

    let btnCancel = document.createElement("input");
    btnCancel.type = "button";
    btnCancel.value = "Cancelar";
    row.cells[4].innerHTML = "";
    btnCancel.className = "btnCancel";
    row.cells[4].appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
      this._cancelEdit(row, tarea);
    });
  }

  _searchHomework(name) {
    let foundAt = -1;
    this._tareas.forEach((e, index) => {
      if (e.name === name) {
        foundAt = index;
        return;
      }
    });
    return foundAt;
  }

  _saveEditar(row, tarea, newHomework) {
    
    let pos = this._searchHomework(tarea.name);
    console.log(  newHomework.dateFin)


    this._tareas[pos] = newHomework;
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
    console.log(this._tareas)
    location.reload();
    //this._cancelEdit(row, new Tarea(newHomework));
  }

  _cancelEdit(row, tarea) {
    row.cells[0].innerHTML = tarea.name;
    row.cells[1].innerHTML = tarea.getDateFinAsString();
    this._addBtnsEditDelete(row, tarea);
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
      return 1;
    }

    if (x.name < y.name) {
      return -1;
    }
    return 0;
  }

  showAlpha() {
    this._tareas.sort(this._compAlpha);
    location.reload();
    localStorage.setItem("tareas", JSON.stringify(this._tareas));
  }
}