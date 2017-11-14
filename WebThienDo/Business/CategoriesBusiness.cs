using System.Collections.Generic;
using System.Linq;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class CategoriesBusiness
    {
        private readonly AppDBContext _appDbContext;

        public CategoriesBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<Category> GetAll()
        {
            return _appDbContext.Set<Category>().ToList();
        }
    }
}