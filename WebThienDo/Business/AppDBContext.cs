using System.Data.Entity;
using WebThienDo.Migrations;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class AppDBContext : DbContext
    {
        public AppDBContext() : base("name=connString")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AppDBContext, Configuration>());
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasMany(c => c.Tags)
                .WithMany()
                .Map(m =>
                    {
                        m.MapLeftKey("ProductId");
                        m.MapRightKey("TagId");
                        m.ToTable("ProductsTags");
                    });
            modelBuilder.Entity<Post>()
                .HasMany(c => c.Tags)
                .WithMany()
                .Map(m =>
                    {
                        m.MapLeftKey("PostId");
                        m.MapRightKey("TagId");
                        m.ToTable("PostsTags");
                    });
            modelBuilder.Entity<Product>()
                .HasMany(c => c.RelatedProducts)
                .WithMany()
                .Map(m =>
                    {
                        m.MapLeftKey("ProductId");
                        m.MapRightKey("RelatedProductId");
                        m.ToTable("RelatedProducts");
                    });
        }
    }
}