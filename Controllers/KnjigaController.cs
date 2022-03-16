using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace bib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnjigaController : ControllerBase
    {
        public BibliotekaContext Context { get; set ;}
        public KnjigaController(BibliotekaContext context)
        {
            Context=context;
        }

        [Route("PreuzmiKnjigu/{biblioteka}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKnjigu (int biblioteka)
        {
            var bibl = await Context.Biblioteke.Where(p => p.ID == biblioteka).FirstOrDefaultAsync();    

            var knjige = Context.Knjige
            .Include(p => p.Zanr)
            .Include(p => p.Biblioteka)
            .Where(p => p.Biblioteka == bibl);

            var knjiga = await knjige.ToListAsync();
            return Ok(
                knjiga.Select(p =>
                new
                { 
                    ID=p.ID,
                    Sifra = p.Sifra,
                    Naziv = p.Naziv,
                    Zanr = p.Zanr.Naziv,
                    Biblioteka = p.Biblioteka.Naziv
                }).ToList()
            );


        }

        [Route("DodajKnjigu/{sifra}/{naziv}/{zanr}/{biblioteka}")]
        [HttpPost]
        public async Task<ActionResult> DodajKnjigu(int sifra, string naziv, int zanr, int biblioteka)
        {
            if(sifra < 100 || sifra > 999)
                return BadRequest("Pogresna vrednost sifre");

            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50  )
                return BadRequest("Pogresan naziv");

            var z = Context.Zanrovi.Where( p => p.ID == zanr ).FirstOrDefault();
            if(z == null)
                return BadRequest("Izabrani zanr ne postoji");

            var bibl = await Context.Biblioteke.Where(p => p.ID == biblioteka).FirstOrDefaultAsync();
            if(bibl == null)
                    return BadRequest("Biblioteka ne postoji");    

            try{
                Knjiga k = new Knjiga
                {
                    Sifra = sifra,
                    Naziv = naziv,
                    Zanr = z,
                    Biblioteka = bibl
                };
                Context.Knjige.Add(k);
                await Context.SaveChangesAsync();
                return Ok("Knjiga je dodata");    
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }

        }
        [Route("PromeniKnjigu/{Sifra}/{Naziv}/{Zanr}/{biblioteka}")]
        [HttpPut]
        public async Task<ActionResult> PromeniKnjigu(int Sifra, string Naziv, int Zanr, int biblioteka)
        {
            if(Sifra < 100 || Sifra > 999)
                return BadRequest("Pogresna vrednost sifre");

            if(string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
                return BadRequest("Naziv nije validan"); 

            var bibl = await Context.Biblioteke.Where(p => p.ID == biblioteka).FirstOrDefaultAsync();
            if(bibl == null)
                    return BadRequest("Biblioteka ne postoji");

            var x = Context.Zanrovi.Where( p => p.ID == Zanr ).FirstOrDefault();

            try
            {

                var knjiga = Context.Knjige.Where( p => p.Sifra == Sifra ).FirstOrDefault();
                if(knjiga != null)
                {

                    knjiga.Naziv=Naziv;
                    knjiga.Zanr=x;
                    knjiga.Biblioteka = bibl;
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno promenjena knjiga sa ID: "+knjiga.ID);
                }
                else
                    return BadRequest("Knjiga nije pronadjena");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("IzbrisiKnjigu/{Sifra}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiKnjigu(int Sifra)
        {
             if(Sifra < 100 || Sifra > 999)
                return BadRequest("Pogresna vrednost sifre");
                
          
            try
            {
                var  knjige = await Context.Knjige.Where( p => p.Sifra == Sifra ).FirstAsync();
                var Iznajmljivanja=await Context.Iznajmljivanja
                .Include(a=>a.Clan)
                .Include(a=>a.Knjiga)
                .ToListAsync();
                if(Iznajmljivanja.Any(n=>n.Knjiga.Sifra==Sifra))
                    return BadRequest("Knjiga je zaduzena");
                
                if(knjige != null)
                {
                    Context.Knjige.Remove(knjige);
                    await Context.SaveChangesAsync();
                    return Ok("Izbrisana knjiga sa ID: "+knjige.ID);

                }
                else   
                    return BadRequest("Knjiga nije pronadjena");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

    }
}
