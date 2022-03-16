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
    public class IznajmljivanjeController : ControllerBase
    {
        public BibliotekaContext Context { get; set ;}
        public IznajmljivanjeController(BibliotekaContext context)
        {
            Context=context;
        }
        
        [Route("PreuzmiIznajmljivanje/{ClKarta}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiIznajmljivanje(int ClKarta)
        {
            if(ClKarta < 100 || ClKarta > 999)
                return BadRequest("Pogresna vrednost clanske karte");    

            var i = Context.KnjigeClanovi
            .Include(p => p.Clan)
            .Include(p => p.Knjiga)
            .Include(p => p.Biblioteka)
            .Where(p => p.Clan.ClanskaKarta == ClKarta);

            var x = Context.Clanovi.Where(p => p.ClanskaKarta == ClKarta).FirstOrDefault();
            if(x == null)
                return BadRequest("Ne postoji iznajmljivanje za izabranu clansku kartu");

            try
            {
                return Ok( await i.Select( p =>
                    new
                    {
                        Biblioteka = p.Biblioteka.Naziv,
                        Ime = p.Clan.Ime,
                        Prezime = p.Clan.Prezime,
                        Mesec = p.Mesec.Naziv,
                        Knjiga = p.Knjiga.Naziv,
                        Zanr= p.Knjiga.Zanr.Naziv
                    }).ToListAsync()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("UnesiIznajmljivanje/{mesecID}/{clanskaKarta}/{Sifra}")]
        [HttpPost]
        public async Task<ActionResult> UnesiIznajmljivanje(int mesecID, int clanskaKarta, int Sifra)
        {
            try
            {
                var clan = await Context.Clanovi.Where(p => p.ClanskaKarta == clanskaKarta).FirstOrDefaultAsync();
                var knjiga = await Context.Knjige.Where(p => p.Sifra == Sifra).FirstOrDefaultAsync();
                var mesec = await Context.Meseci.FindAsync(mesecID);

                if(clan == null)
                    return BadRequest("Clan sa izabranom clanskom kartom ne postoji");
                if(knjiga == null)
                    return BadRequest("Knjiga sa izabranom sifrom ne postoji");
                if(mesec == null)
                    return BadRequest("Izabrani mesec ne postoji");       


                var bibl = await Context.Clanovi
                .Include(p => p.Biblioteka)
                .Where(p => p.ClanskaKarta == clanskaKarta)
                .FirstOrDefaultAsync();

                if(bibl.Biblioteka != knjiga.Biblioteka)
                    return BadRequest("Clan i knjiga se ne nalaze u istoj biblioteci"); 

                Iznajmljivanje i =new Iznajmljivanje
                {
                    Clan = clan,
                    Knjiga = knjiga,
                    Mesec = mesec,
                    Biblioteka = bibl.Biblioteka
                };

                Context.KnjigeClanovi.Update(i);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }



    }
}