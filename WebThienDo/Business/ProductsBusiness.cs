using System.Collections.Generic;
using System.Linq;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class ProductsBusiness
    {

        private readonly AppDBContext _appDbContext;

        public ProductsBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<Product> GetAll()
        {
            return _appDbContext.Set<Product>().ToList();
        }

    }
}