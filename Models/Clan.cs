using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

      [Table("Clan")]
    public class Clan
    {
        [Key]
        public int ID { get; set; }


        [Required]
        public int ClanskaKarta { get; set; }


        [Required]
        [MaxLength(30)]
        public string Ime { get; set; }


        [Required]
        [MaxLength(30)]
        public string Prezime { get; set; }

        public virtual Biblioteka Biblioteka{ get; set; }


        [JsonIgnore]
        public virtual List<Iznajmljivanje> ClanKnjiga { get; set; }

    }
}