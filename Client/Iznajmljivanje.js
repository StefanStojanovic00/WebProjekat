export class Iznajmljivanje{
    constructor(biblioteka, ime, prezime, mesec, knjiga, zanr){
        this.biblioteka=biblioteka;
        this.ime=ime;
        this.prezime=prezime;
        this.mesec=mesec;
        this.knjiga=knjiga;
        this.zanr=zanr;
    }

    crtaj(host){
       
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.biblioteka;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.ime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.mesec;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.knjiga;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.zanr;
        tr.appendChild(el);
    }
}