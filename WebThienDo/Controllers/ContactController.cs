using System.Web.Mvc;

namespace WebThienDo.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
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
    }
}