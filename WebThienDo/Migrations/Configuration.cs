using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using WebThienDo.Business;
using WebThienDo.Models;

namespace WebThienDo.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<AppDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(AppDBContext context)
        {
            List<Category> categories = new List<Category>
            {
                new Category { Id = 1, Name = "Máy đào Bitcoin", Descriptions = "Máy đào Bitcoin", Order = 1, Status = "show" },
                new Category { Id = 2, Name = "Linh kiện Bitcoin", Descriptions = "Linh kiện Bitcoin", Order = 2, Status = "show" }
            };
            foreach (var category in categories)
            {
                context.Categories.AddOrUpdate(category);
            }

            List<Tag> tagses = new List<Tag>
            {
                new Tag { Id = 1, Name = "Máy đào" },
                new Tag { Id = 2, Name = "Linh kiện" }
            };

            foreach (var tags in tagses)
            {
                context.Tags.AddOrUpdate(tags);
            }

            Account account = new Account()
            {
                Username = "adminss",
                Password = "nimdass",
            };

            if (context.Accounts.FirstOrDefault(x => x.Username.Equals(account.Username)) == null)
            {
                context.Accounts.AddOrUpdate(account);
            }

            context.SaveChanges();
            base.Seed(context);
        }
    }
}
