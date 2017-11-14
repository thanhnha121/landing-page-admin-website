using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(256), Required, Column(TypeName = "NVARCHAR")]
        public string Name { get; set; }
        [MaxLength(1024), Column(TypeName = "NVARCHAR")]
        public string Descriptions { get; set; }
        public int Order { get; set; }
        public string Status { get; set; }
    }
}