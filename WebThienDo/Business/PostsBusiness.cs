using System.Collections.Generic;
using System.Linq;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class PostsBusiness
    {
        private readonly AppDBContext _appDbContext;

        public PostsBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<Post> GetAll()
        {
            return _appDbContext.Set<Post>().ToList();
        }
    }
}