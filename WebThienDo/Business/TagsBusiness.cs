using System.Collections.Generic;
using System.Linq;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class TagsBusiness
    {

        private readonly AppDBContext _appDbContext;

        public TagsBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<Tag> GetAll()
        {
            return _appDbContext.Set<Tag>().ToList();
        }
    }
}