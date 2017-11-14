using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(30), Required, Column(TypeName = "VARCHAR")]
        public string Username { get; set; }
        [MaxLength(30), Column(TypeName = "VARCHAR")]
        public string Password { get; set; }
        public DateTime ? LastLogin { get; set; }
        public string Status { get; set; }
    }
}