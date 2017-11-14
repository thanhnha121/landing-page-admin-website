using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(256), Required, Column(TypeName = "NVARCHAR")]
        public string Title { get; set; }
        [MaxLength(4000), Required, Column(TypeName = "NVARCHAR")]
        public string Content { get; set; }
        [MaxLength(4000), Required, Column(TypeName = "NVARCHAR")]
        public string Descriptions { get; set; }
        public List<Tag> Tags { get; set; }
        public float Price { get; set; }
        public int RemainCount { get; set; }
        public Category Category { get; set; }
        public List<Product> RelatedProducts { get; set; }
        public int Order { get; set; }
        public List<Image> Images { get; set; }
        public string Status { get; set; }

        public Product()
        {
            Tags = new List<Tag>();
            RelatedProducts = new List<Product>();
            Images = new List<Image>();
            Descriptions = string.Empty;
            Content = string.Empty;
            Price = 0;
            RemainCount = 0;
        }
    }
}