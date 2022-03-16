using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Biblioteka")]
    public class Biblioteka
    {
         [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }
        
        [JsonIgnore]
        public virtual List<Knjiga> BibliotekaKnjiga { get; set; }

        [JsonIgnore]
        public virtual List<Clan> BibliotekaClan { get; set; }

        [JsonIgnore]
        public virtual List<Iznajmljivanje> KnjigaBiblioteka { get; set; }
    }
}