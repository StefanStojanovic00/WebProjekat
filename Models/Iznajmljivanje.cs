using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Iznajmljivanje")]
    public class Iznajmljivanje
    {
    
        public int ID { get; set; }
        public virtual Clan Clan { get; set; }
        public virtual Knjiga Knjiga { get; set; }
        public virtual Mesec Mesec { get; set; }
        public virtual Biblioteka Biblioteka { get; set; }
    }
}