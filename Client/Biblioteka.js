import { Iznajmljivanje } from "./Iznajmljivanje.js";
import {Knjiga} from "./Knjiga.js";
import { Clan } from "./Clan.js";

export class Biblioteka
{
    constructor(listaMeseca,listaZanrova,listaBiblioteka)
    {
        this.listaMeseca=listaMeseca;
        this.listaZanrova=listaZanrova;
        this.listaBiblioteka=listaBiblioteka;
        this.kont = null;
    }
    crtaj(host)
    {
        this.kont = document.createElement("div");
        this.kont.className="GlavniKontejner";
        host.appendChild(this.kont);

        let kontForma = document.createElement("div");
        kontForma.className = "kontForma";
        this.kont.appendChild(kontForma);

        this.crtajFormu(kontForma);

        this.crtajPrikaz(this.kont);
    }

    crtajPrikaz(host){

        let kontPrikaz = document.createElement("div");
        kontPrikaz.className="kontPrikaz";
        host.appendChild(kontPrikaz);

        var tabela = document.createElement("table");
        tabela.className="tabela";
        kontPrikaz.appendChild(tabela);

        var tabelahead= document.createElement("thead");
        tabela.appendChild(tabelahead);

        var tr = document.createElement("tr");
        tabelahead.appendChild(tr);

        var tabelaBody = document.createElement("tbody");
        tabelaBody.className="TabelaPodaci";
        tabela.appendChild(tabelaBody);
    }

    crtajFormu(host)
    {   
        const kontejnerG=document.createElement("div");
        kontejnerG.className="gornji";
        host.appendChild(kontejnerG);
        this.gornji(kontejnerG);
        



        const kontejner2=document.createElement("div");
        kontejner2.className="donji";
        host.appendChild(kontejner2);
        this.donji(kontejner2);

       const kontejner3=document.createElement("div");
       kontejner3.className="treci";
        host.appendChild(kontejner3);
        this.treci(kontejner3);
       

        

    }          
    gornji(host)
    {
        let nizRadiobtn = ["Prikaz","Dodaj Knjigu","Iznajmi Knjigu","Obrisi Clana","Izmeni Clana"];

        let divRadioBtn = document.createElement("div");
        divRadioBtn.className = "divRadio";
        host.appendChild(divRadioBtn);

        nizRadiobtn.forEach((el,index) => {
            let l =  document.createElement("label");
            l.className = "lblRadio"
            l.innerHTML=el;
            divRadioBtn.appendChild(l);

            let rbt = document.createElement("input");
            rbt.type = "radio";
            rbt.value = index;
            rbt.name = "izaberi"
            rbt.onchange = (ev)=>{this.radioChange()};
            divRadioBtn.appendChild(rbt);

            if(index === 0)
                rbt.checked=true;
        })


        let redPrikaz = document.createElement("div");
        redPrikaz.className = "redPrikaz";
        host.appendChild(redPrikaz);

        let PrikazClan = document.createElement("button");
        PrikazClan.className = "PrikazClan";
        PrikazClan.innerHTML = "Prikazi clanove";
        PrikazClan.onclick = (ev)=>this.PreuzmiClanove();
        redPrikaz.appendChild(PrikazClan);
        
        let btnKnjige = document.createElement("button");
        btnKnjige.className = "btnKnjige";
        btnKnjige.innerHTML = "Prikazi knjige";
        btnKnjige.onclick = (ev)=>this.PrikaziKnjige();
        redPrikaz.appendChild(btnKnjige);

        let Iznajmljivanjabtn = document.createElement("button");
        Iznajmljivanjabtn.className = "Iznajmljivanjabtn";
        Iznajmljivanjabtn.innerHTML = "Prikazi iznajmljivanja";
        Iznajmljivanjabtn.onclick = (ev)=>this.PrikaziIznajmljivanja();
        redPrikaz.appendChild(Iznajmljivanjabtn);

        


        let z = document.createElement("label");
        z.innerHTML="Biblioteka";
        host.appendChild(z);

        let se = document.createElement("select");
        se.className = "bibliotekaSelect";
        host.appendChild(se);

        let op;
        this.listaBiblioteka.forEach(p=>{
            op = document.createElement("option");
            op.innerHTML=p.naziv;
            op.value=p.id;
            se.appendChild(op);
        })


        z = document.createElement("label");
        z.innerHTML="Zanr";
        host.appendChild(z);

        se = document.createElement("select");
        se.className = "zanrSelect";
        host.appendChild(se);

        op;
        this.listaZanrova.forEach(p=>{
            op = document.createElement("option");
            op.innerHTML=p.naziv;
            op.value=p.id;
            se.appendChild(op);
        })

        let l =  document.createElement("label");
        l.innerHTML="Sifra"
        host.appendChild(l);
        var Sifra = document.createElement("input");
        Sifra.type="number";
        Sifra.className="sifraClass";
        host.appendChild(Sifra);

        l =  document.createElement("label");
        l.innerHTML="Naziv"
        host.appendChild(l);
        var Naziv = document.createElement("input");
        Naziv.type="text";
        Naziv.className="nazivClass";
        host.appendChild(Naziv);

        let red = document.createElement("div");
        red.className = "redButton";
        host.appendChild(red);

        let btnDodaj = document.createElement("button");
        btnDodaj.className = "btnDodaj";
        btnDodaj.innerHTML = "Dodaj knjigu";
        btnDodaj.onclick = (ev)=>this.dodajKnjigu();
        red.appendChild(btnDodaj);

        let btnIzmeni = document.createElement("button");
        btnIzmeni.className = "btnIzmeni";
        btnIzmeni.innerHTML = "Izmeni knjigu";
        btnIzmeni.onclick = (ev)=>this.izmeniKnjigu();
        red.appendChild(btnIzmeni);

        let btnObrisi = document.createElement("button");
        btnObrisi.className = "btnObrisi";
        btnObrisi.innerHTML = "Obrisi knjigu";
        btnObrisi.onclick = (ev)=>this.obrisiKnjigu();
        red.appendChild(btnObrisi);
    }
    donji(host)
    {
        let m = document.createElement("label");
        m.innerHTML="Mesec";
        host.appendChild(m);

        let se1 = document.createElement("select");
        se1.className = "mesecSelect";
        host.appendChild(se1);

        let op1;
        this.listaMeseca.forEach(p=>{
            op1 = document.createElement("option");
            op1.innerHTML=p.naziv;
            op1.value=p.id;
            se1.appendChild(op1);
        })

        let l =  document.createElement("label");
        l.innerHTML="Clanska karta"
        host.appendChild(l);
        var clKarta = document.createElement("input");
        clKarta.type="number";
        clKarta.className="clKartaClass";
        host.appendChild(clKarta);

        l =  document.createElement("label");
        l.innerHTML="Sifra"
        host.appendChild(l);
        var Sifra = document.createElement("input");
        Sifra.type="number";
        Sifra.className="sifra2Class";
        host.appendChild(Sifra);


        let btnIznajmi = document.createElement("button");
        btnIznajmi.className = "btnIznajmi";
        btnIznajmi.innerHTML = "Iznajmi";
        btnIznajmi.onclick = (ev)=>this.iznajmiKnjigu();
        host.appendChild(btnIznajmi);

        var rbt1 = [".mesecSelect",".sifra2Class",".btnIznajmi"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            var rbt2 = [".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi"];
            rbt2.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            const kontejner3=document.createElement("div");
            kontejner3.className="obrisiClana";
            host.appendChild(kontejner3);
            this.ObrisiClanaCrtaj(kontejner3);
    }
    ObrisiClanaCrtaj(host)
    {
        let l =  document.createElement("label");
        l.innerHTML="Clanska karta"
        host.appendChild(l);
        var clKarta = document.createElement("input");
        clKarta.type="number";
        clKarta.className="clKartaClass2";
        host.appendChild(clKarta);


        
        let ObrisiCLan = document.createElement("button");
        ObrisiCLan.className = "ObrisiCLan";
        ObrisiCLan.innerHTML = "Obrisi Clana";
        ObrisiCLan.onclick = (ev)=>this.ObrisiClan();
        host.appendChild(ObrisiCLan);

        

    }
    treci(host)
    {
        let l =  document.createElement("label");
        l.innerHTML="Clanska karta"
        host.appendChild(l);
        var clKarta = document.createElement("input");
        clKarta.type="number";
        clKarta.className="clKartaClass3";
        host.appendChild(clKarta);

        l =  document.createElement("label");
        l.innerHTML="Ime"
        host.appendChild(l);
        var ime = document.createElement("input");
        ime.type="text";
        ime.className="Ime";
        host.appendChild(ime);

        l =  document.createElement("label");
        l.innerHTML="Prezime"
        host.appendChild(l);
        var Prezime = document.createElement("input");
        Prezime.type="text";
        Prezime.className="Prezime";
        host.appendChild(Prezime);

        l =  document.createElement("label");
        l.innerHTML="Biblioteka"
        host.appendChild(l);
        var BibIzmenaCl = document.createElement("input");
        BibIzmenaCl.type="number";
        BibIzmenaCl.className="BiblIzmena";
        host.appendChild(BibIzmenaCl);

        let btnIzmeni = document.createElement("button");
        btnIzmeni.className = "btnIzmeniC";
        btnIzmeni.innerHTML = "Izmeni";
        btnIzmeni.onclick = (ev)=>this.izmeniClana();
        host.appendChild(btnIzmeni);

    }
    izmeniClana()
    {
        var bibliotekaID = this.kont.querySelector(".BiblIzmena").value;
       
        
       
           var Ime = this.kont.querySelector(".Ime").value;
        
        console.log(Ime);
           var prezime = this.kont.querySelector(".Prezime").value;
          
          console.log(prezime);
           var clKartaa = this.kont.querySelector(".clKartaClass3").value;

         console.log(clKartaa);
            fetch("https://localhost:5001/Clan/PromeniClana/"+clKartaa+"/"+Ime+"/"+prezime+"/"+bibliotekaID,
        {
            method:"PUT"
        }).then(s=>{
            if(s.ok){
    
               
               alert("Clan je promenjen");
            }
            else
            {
                alert("Clan nije validan");
            }
        })

    }

    ObrisiClan()
    { 
        let a = this.kont.querySelector(".clKartaClass2").value;
       console.log(a);
        this.obirisiClana(a);

    }
    obirisiClana(ClanID)
    {
       
            console.log(ClanID);

            fetch("https://localhost:5001/Clan/ObrisiClana/"+ClanID,
        {
            method:"DELETE"
        }).then(s=>{
            if(s.ok){               
                alert("Obrisan je clan sa clanskom kartom: "+ClanID);
            }
            else
            {
                alert("Sifra nije validna");
            }
        })    
    }
    dodajKnjigu()
    {
            let a = this.kont.querySelector(".bibliotekaSelect");
            var bibliotekaID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".zanrSelect");
            var zanrID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".nazivClass");
            var naziv=a.value;

            a = this.kont.querySelector(".sifraClass");
            var sifra=a.value;

            fetch("https://localhost:5001/Knjiga/DodajKnjigu/"+sifra+"/"+naziv+"/"+zanrID+"/"+bibliotekaID,
            {
                method:"POST"
            }).then(s=>{
                if(s.ok){
                    this.PreuzmiKnjigu(bibliotekaID);
                }
                else
                {
                    alert("Sifra nije validna");
                }
            })
    }

    izmeniKnjigu()
    {
            let a = this.kont.querySelector(".bibliotekaSelect");
            var bibliotekaID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".zanrSelect");
            var zanrID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".nazivClass");
            var naziv=a.value;

            a = this.kont.querySelector(".sifraClass");
            var sifra=a.value;

            fetch("https://localhost:5001/Knjiga/PromeniKnjigu/"+sifra+"/"+naziv+"/"+zanrID+"/"+bibliotekaID,
        {
            method:"PUT"
        }).then(s=>{
            if(s.ok){
                this.PreuzmiKnjigu(bibliotekaID);
            }
            else
            {
                alert("Sifra nije validna");
            }
        })
    }

    obrisiKnjigu()
    {
            let a = this.kont.querySelector(".bibliotekaSelect");
            var bibliotekaID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".sifraClass");
            var sifra=a.value;

            fetch("https://localhost:5001/Knjiga/IzbrisiKnjigu/"+sifra,
        {
            method:"DELETE"
        }).then(s=>{
            if(s.ok){
                this.PreuzmiKnjigu(bibliotekaID);
            }
            else
            {
                alert("Sifra nije validna");
            }
        })
    }

    PreuzmiKnjigu(bibliotekaID)
    {
        fetch("https://localhost:5001/Knjiga/PreuzmiKnjigu/"+bibliotekaID,
        {
            method:"GET"
        }).then(s=>{
            if(s.ok){
                if (s.status ==200)
               {
                   var teloTabele = this.obrisiPrethodniSadrzaj();
                    let th;
                    var zag=["Sifra", "Naziv", "Zanr", "Biblioteka"];
                    zag.forEach(el=>{
                        th = document.createElement("th");
                        th.innerHTML=el;
                        teloTabele.appendChild(th);
                    })
                   s.json().then(data=>{
                       console.log(data);
                       data.forEach(s=>{
                           const k = new Knjiga(s.sifra, s.naziv, s.zanr,s.biblioteka);
                           k.crtaj(teloTabele);
                       });
                   })
               }
            }
            else
            {
                this.obrisiPrethodniSadrzaj();
            }
        })

    }

    iznajmiKnjigu()
    {
            let a = this.kont.querySelector(".bibliotekaSelect");
            var bibliotekaID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".mesecSelect");
            var mesecID=a.options[a.selectedIndex].value;

            a = this.kont.querySelector(".clKartaClass");
            var clKarta=a.value;

            a = this.kont.querySelector(".sifra2Class");
            var sifraIz=a.value;

            console.log(mesecID);
            console.log(clKarta);
            console.log(sifraIz);

            this.Iznajmi(mesecID,clKarta,sifraIz)

    }

    Iznajmi(mesecID,clKarta,sifraIz)
    {
        fetch("https://localhost:5001/Iznajmljivanje/UnesiIznajmljivanje/"+mesecID+"/"+clKarta+"/"+sifraIz,
        {
            method:"POST"
        }).then(s=>{
            if(s.ok){
                console.log(s.status);
                console.log(s);
                if (s.status ==200)
               {
                  this.PreuzmiIznajmljivanja(clKarta);
               }
            }
            else
            {
                alert("Nije validno");
            }
        })

    }
    PreuzmiClanove()
    {  
        fetch("https://localhost:5001/Clan/PreuzmiClanove/",
    {
        method:"GET"
    }).then(s=>{
        if(s.ok){
            console.log(s.status);
            console.log(s);
            if (s.status ==200)
           {
                var teloTabele = this.obrisiPrethodniSadrzaj();
                let th;
                var zag=[ "Clanska Karta", "Ime", "Prezime","Biblioteka"];
                zag.forEach(el=>{
                    th = document.createElement("th");
                    th.innerHTML=el;
                    teloTabele.appendChild(th);
                })
               s.json().then(data=>{                   
                   data.forEach(s=>{
                       const k = new Clan(s.id,s.clanskaKarta, s.ime, s.prezime,s.biblioteka);
                       console.log(k);
                       k.crtaj(teloTabele);
                   });
               })
           }
        }
        else
        {
            this.obrisiPrethodniSadrzaj();
        }
    })

    
    /*PreuzmiClana(clanskaKarta)
        {
            fetch("https://localhost:5001/Clan/PreuzmiClana/"+clanskaKarta,
            {
                method:"GET"
            }).then(s=>{
                if(s.ok){
                  //  if (s.status ==200)
                    if (s.status ==200)
                    {
                         var teloTabele = this.obrisiPrethodniSadrzaj();
                         let th;
                         var zag=[ "Clanska Karta", "Ime", "Prezime","Biblioteka"];
                         zag.forEach(el=>{
                             th = document.createElement("th");
                             th.innerHTML=el;
                             teloTabele.appendChild(th);
                         })
                        s.json().then(data=>{                   
                            data.forEach(s=>{
                                const k = new Clan(s.id,s.clanskaKarta, s.ime, s.prezime,s.biblioteka);
                                console.log(k);
                                k.crtaj(teloTabele);
                            });
                        })
                   }
                }
                
            })
        }*/



    }
    PreuzmiIznajmljivanja(clKarta)
    {
        fetch("https://localhost:5001/Iznajmljivanje/PreuzmiIznajmljivanje/"+clKarta,
        {
            method:"GET"
        }).then(s=>{
            if(s.ok){
                console.log(s.status);
                console.log(s);
                if (s.status ==200)
               {
                    var teloTabele = this.obrisiPrethodniSadrzaj();
                    let th;
                    var zag=["Biblioteka", "Ime", "Prezime", "Mesec", "Knjiga", "Zanr"];
                    zag.forEach(el=>{
                        th = document.createElement("th");
                        th.innerHTML=el;
                        teloTabele.appendChild(th);
                    })
                   s.json().then(data=>{
                       console.log(data);
                       data.forEach(s=>{
                           const k = new Iznajmljivanje(s.biblioteka, s.ime, s.prezime,s.mesec, s.knjiga, s.zanr);
                           k.crtaj(teloTabele);
                       });
                   })
               }
            }
            else
            {
                this.obrisiPrethodniSadrzaj();
            }
        })
    }

    radioChange()
    {
        let rbt = document.querySelector("input[type='radio']:checked").value;
        if(rbt == 0)
        {
            var rbt1 = [".mesecSelect",,".sifra2Class",".btnIznajmi"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            var rbt1 = [".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi",".clKartaClass2",".BiblIzmena",".Ime",".Prezime",".clKartaClass3"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            var rbt1 = [".PrikazClan",".btnKnjige",".Iznajmljivanjabtn",".clKartaClass",".bibliotekaSelect"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = false;
            })

        }
        else if(rbt == 1)
        {
            var rbt1 = [".mesecSelect",".BiblIzmena",".Ime",".Prezime",".clKartaClass3",".sifra2Class",".PrikazClan",".btnIznajmi",".clKartaClass",".btnKnjige",".Iznajmljivanjabtn",".clKartaClass2"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            var rbt1 = [".bibliotekaSelect",".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = false;
            })
        }
        else if(rbt==2)
        {
            var rbt1 = [".BiblIzmena",".Ime",".Prezime",".clKartaClass3",".bibliotekaSelect",".PrikazClan",".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi",".btnKnjige",".Iznajmljivanjabtn",".clKartaClass2"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = true;
            })

            var rbt1 = [".mesecSelect",".clKartaClass",".sifra2Class",".btnIznajmi"];
            rbt1.forEach(p => {
                const x = document.querySelector(p);
                x.disabled = false;
            })
        }
        else if(rbt==3){
            var rbt1 = [".clKartaClass2"];
        rbt1.forEach(p => {
            const x = document.querySelector(p);
            x.disabled = false;
        })

        var rbt2 = [".bibliotekaSelect",".BiblIzmena",".Ime",".Prezime",".clKartaClass3",".PrikazClan",".btnObrisi",".btnKnjige",".Iznajmljivanjabtn",".clKartaClass",".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi",".mesecSelect",".sifra2Class",".btnIznajmi"];
        rbt2.forEach(p => {
            const x = document.querySelector(p);
            x.disabled = true;
        })
        }
        else{
            var rbt1 = [".BiblIzmena",".Ime",".Prezime",".clKartaClass3"];
        rbt1.forEach(p => {
            const x = document.querySelector(p);
            x.disabled = false;
        })

        var rbt2 = [".bibliotekaSelect",".clKartaClass2",".PrikazClan",".btnObrisi",".btnKnjige",".Iznajmljivanjabtn",".clKartaClass",".zanrSelect",".sifraClass",".nazivClass",".btnDodaj",".btnIzmeni",".btnObrisi",".mesecSelect",".sifra2Class",".btnIznajmi"];
        rbt2.forEach(p => {
            const x = document.querySelector(p);
            x.disabled = true;
        })
        }
        

    }
    PrikaziKnjige()
    {
        let a = this.kont.querySelector(".bibliotekaSelect");
            var bibliotekaID=a.options[a.selectedIndex].value;
        this.PreuzmiKnjigu(bibliotekaID);    
    }


    PrikaziIznajmljivanja()
    {
        let a = this.kont.querySelector(".clKartaClass");
            var clKarta=a.value;
        this.PreuzmiIznajmljivanja(clKarta);    
    }


    obrisiPrethodniSadrzaj()
    {
        var tabela = document.querySelector(".tabela");
        var roditelj = tabela.parentNode;
        roditelj.removeChild(tabela);

        tabela = document.createElement("tbody");
        tabela.className="tabela";
        roditelj.appendChild(tabela);
        return tabela;
    }


}