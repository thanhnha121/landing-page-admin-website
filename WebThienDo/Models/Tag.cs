using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(256), Required, Column(TypeName = "NVARCHAR")]
        public string Name { get; set; }
    }
}