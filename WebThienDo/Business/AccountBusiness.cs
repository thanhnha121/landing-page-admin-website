using System;
using System.Linq;

namespace WebThienDo.Business
{
    public class AccountBusiness
    {
        private readonly SessionBusiness _sessionBusiness;
        private readonly AppDBContext _appDbContext;

        public AccountBusiness(SessionBusiness sessionBusiness, AppDBContext appDbContext)
        {
            _sessionBusiness = sessionBusiness;
            _appDbContext = appDbContext;
        }

        public string Login(string username, string password)
        {
            if (IsExistAccount(username, password))
            {
                return _sessionBusiness.CreateToken(username);
            }
            return null;
        }

        private Boolean IsExistAccount(string username, string password)
        {
            if (_appDbContext.Accounts.FirstOrDefault(x => x.Username.Equals(username) && x.Password.Equals(password)) != null)
            {
                return true;
            }
            return false;
        }

        public Boolean Logout(string token)
        {
            return _sessionBusiness.Logout(token);
        }
    }
}