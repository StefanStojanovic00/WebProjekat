import { Biblioteka } from "./Biblioteka.js";
export class Clan{
    constructor(id,clKarta, ime, prezime, biblioteka){
        this.id=id;
        this.clKarta=clKarta;
        this.ime=ime;
        this.prezime=prezime;
        this.biblioteka=biblioteka;
    }

    crtaj(host){
       
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.clKarta;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.ime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.biblioteka;
        tr.appendChild(el);
    }
}