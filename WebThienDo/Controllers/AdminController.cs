using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using WebThienDo.Business;
using WebThienDo.Models;

namespace WebThienDo.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
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

        // GET: Admin
        public ActionResult Email()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        [HttpGet]
        public string GetListEmails()
        {
            AppDBContext appDbContext = new AppDBContext();
            List<Message> list = appDbContext.Messages.ToList();
            return JsonConvert.SerializeObject(new { status = 1, message = "success", data = list });
        }


    }
}