import Tabla from "./Tabla.js";
import Tarea from "./Tarea.js";

class Main {
  constructor() {
    let tabla = new Tabla(
      document.querySelector("#Lista"),
    );

    document.querySelector("#AddContac").addEventListener("click", () => {
        let form = document.querySelector("#form");
        form.classList.add("was-validated");

        if(form.checkValidity() === true) {
            let name = document.querySelector("#name").value;
            let sDateFin = document.querySelector("#dateFin").value;
            sDateFin = sDateFin.split("-");

            let dateFin = new Date(sDateFin[0], sDateFin[1] - 1, sDateFin[2]);

            let objTarea = {
                name,
                dateFin
            };
            let tarea = new Tarea(objTarea);
            tabla.addContacto(tarea);
            tabla.showTime();
        }
    });

    document.querySelector("#buttonAlpha").addEventListener("click",() => {
      tabla.showAlpha();
    });

    document.querySelector("#buttonTime").addEventListener("click", () => {
      tabla.showTime();
    });

  }

}

let m = new Main();