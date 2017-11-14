using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(1000), Required, Column(TypeName = "VARCHAR")]
        public string Url { get; set; }
    }
}