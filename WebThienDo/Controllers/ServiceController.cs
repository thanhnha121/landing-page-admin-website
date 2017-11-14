using System.Web.Mvc;

namespace WebThienDo.Controllers
{
    public class ServiceController : Controller
    {
        // GET: Service
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


        // GET: Service
        public ActionResult Ky_Gui()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        // GET: Service
        public ActionResult Trade_Coin()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        // GET: Service
        public ActionResult Lap_Dat_Bao_Tri()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        // GET: Service
        public ActionResult Trao_Doi_Coin()
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