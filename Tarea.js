export default class Tarea {
    constructor(tarea) {
      this._name = tarea.name.toUpperCase();
      this._dateFin = tarea.dateFin;
      this._months = [
        "Ene", "Feb",
        "Mar", "Abr",
        "May", "Jun",
        "Jul", "Ago",
        "Sep", "Oct",
        "Nov", "Dic"
      ];
    }

  get name() {
    return this._name;
  }

  get dateFin() {
    return this._dateFin;
  }

  getDateFinAsString() {
    let date =
      this._dateFin.getDate() +
      "/" +
      this._months[this._dateFin.getMonth()] +
      "/" +
      this._dateFin.getFullYear();
    return date;
  }
  
  getTime() {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneYear = oneDay;
    let differenceMs = this._dateFin - new Date();
    let age = Math.trunc(differenceMs / oneYear);
  
    return age+1;
  }
}