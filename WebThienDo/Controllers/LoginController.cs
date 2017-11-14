using System.Web.Mvc;
using Newtonsoft.Json;
using WebThienDo.Business;

namespace WebThienDo.Controllers
{
    public class LoginController : Controller
    {

        private readonly AccountBusiness _accountBusiness;

        public LoginController()
        {
            AppDBContext appDbContext = new AppDBContext();
            SessionBusiness sessionBusiness = new SessionBusiness(appDbContext);
            _accountBusiness = new AccountBusiness(sessionBusiness, appDbContext);
        }

        // GET: Login
        public ActionResult Index()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        [HttpPost]
        public string AngularLogin(string username, string password)
        {
            string result = _accountBusiness.Login(username, password);
            if (result != null)
            {
                return
                    JsonConvert.SerializeObject(
                        new { status = 1, message = "success", data = new { username = username, token = result } });
            }
            return JsonConvert.SerializeObject(new { status = 0, message = "error" });
        }
    }
}