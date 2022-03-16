using Microsoft.EntityFrameworkCore;

namespace Models
{
     public class BibliotekaContext:DbContext
    {
        public DbSet<Clan> Clanovi { get; set; }
        public DbSet<Iznajmljivanje> Iznajmljivanja { get; set; }
        public DbSet<Knjiga> Knjige { get; set; }
        public DbSet<Iznajmljivanje> KnjigeClanovi { get; set; }
        public DbSet<Zanr> Zanrovi { get; set; }
        public DbSet<Mesec> Meseci { get; set; }
        public DbSet<Biblioteka> Biblioteke { get; set; }
        public BibliotekaContext(DbContextOptions options):base(options)
        {
            
        }

    }

}