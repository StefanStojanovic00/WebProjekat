using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace bib.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MesecController : ControllerBase
    {
        public BibliotekaContext Context { get; set ;}
        public MesecController(BibliotekaContext context)
        {
            Context=context;
        }

        
        [Route("PreuzmiMesec")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi()
        {
            try
            {
                return Ok(await Context.Meseci.Select( p => new{ p.ID, p.Naziv }).ToListAsync() );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
