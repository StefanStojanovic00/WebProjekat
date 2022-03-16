import { Biblioteka } from "./Biblioteka.js";
import { NazivBiblioteka } from "./NazivBiblioteka.js";
import { Mesec } from "./Mesec.js";
import { Zanr } from "./Zanr.js";


var listaMeseca =[];

fetch("https://localhost:5001/Mesec/PreuzmiMesec")
.then(p=>{
    p.json().then(meseci=>{
        meseci.forEach(mesec => {
            var m = new Mesec(mesec.id, mesec.naziv);
            listaMeseca.push(m);
        });
        

        var listaZanrova=[];
        fetch("https://localhost:5001/Zanr/PreuzmiZanr")
        .then(p=>{
            p.json().then(zanrovi=>{
                zanrovi.forEach(zanr=>{
                    var z = new Zanr(zanr.id, zanr.naziv);
                    listaZanrova.push(z);
                })

                var listaBiblioteka=[];
                fetch("https://localhost:5001/Biblioteka/PreuzmiBiblioteke")
                .then(p=>{
                    p.json().then(biblioteke=>{
                        biblioteke.forEach(bibl=>{
                            var x = new NazivBiblioteka(bibl.id, bibl.naziv);
                            listaBiblioteka.push(x);
                        })
                        var b = new Biblioteka(listaMeseca, listaZanrova, listaBiblioteka);
                        b.crtaj(document.body);
                    })
                }) 
            })
        }) 
    })
})
