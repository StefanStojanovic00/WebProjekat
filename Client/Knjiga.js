export class Knjiga{

    constructor(sifra, naziv, zanr, biblioteka){
        this.sifra=sifra;
        this.naziv=naziv;
        this.zanr=zanr;
        this.biblioteka=biblioteka;
    }

    crtaj(host){
       
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML=this.sifra;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.naziv;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.zanr;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.biblioteka;
        tr.appendChild(el);
    }
}