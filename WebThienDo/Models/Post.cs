using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebThienDo.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(256), Required, Column(TypeName = "NVARCHAR")]
        public string Title { get; set; }
        public string Contents { get; set; }
        public string ShortContent { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public String Author { get; set; }
        public List<Post> RelatedPosts { get; set; }
        public List<Tag> Tags { get; set; }
        public string BannerImage { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }

        public Post()
        {
            Contents = string.Empty;
            ShortContent = string.Empty;
            RelatedPosts = new List<Post>();
            Tags = new List<Tag>();
            Date = DateTime.Now;
            BannerImage = string.Empty;
            Status = "show";
            Type = "Tin Tức";
        }
    }
}