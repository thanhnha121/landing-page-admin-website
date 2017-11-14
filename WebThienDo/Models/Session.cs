using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Session
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR")]
        public string Token { get; set; }
        public string Username { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}