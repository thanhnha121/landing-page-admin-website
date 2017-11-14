using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(128), Column(TypeName = "NVARCHAR")]
        public string Name { get; set; }
        [MaxLength(50), Required, Column(TypeName = "VARCHAR")]
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DateTime { get; set; }
        [MaxLength(2048), Column(TypeName = "NVARCHAR")]
        public string Contents { get; set; }
    }
}