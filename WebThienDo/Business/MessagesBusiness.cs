using System.Collections.Generic;
using System.Linq;
using WebThienDo.Models;

namespace WebThienDo.Business
{
    public class MessagesBusiness
    {

        private readonly AppDBContext _appDbContext;

        public MessagesBusiness(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<Message> GetAll()
        {
            return _appDbContext.Set<Message>().ToList();
        }

    }
}