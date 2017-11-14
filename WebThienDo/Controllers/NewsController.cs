using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using WebThienDo.Business;
using WebThienDo.Models;

namespace WebThienDo.Controllers
{
    public class NewsController : Controller
    {
        private readonly AppDBContext _appDbContext;

        public NewsController()
        {
            _appDbContext = new AppDBContext();
        }

        // GET: News
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

        public ActionResult Manager()
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
        public string GetListNews()
        {
            List<Post> categories = _appDbContext.Posts.OrderByDescending(x => x.Date).ToList();
            return JsonConvert.SerializeObject(new { status = 1, message = "success", data = categories });
        }

        [HttpPost]
        public string AddNews(string title, string content, string shortContent, string bannerImage, string type)
        {
            try
            {
                Post p = new Post
                {
                     BannerImage = bannerImage,
                     Contents = content,
                     ShortContent = shortContent,
                     Title = title,
                     Date = DateTime.Now,
                     Status = "show",
                     Type = type
                };
                Post data = _appDbContext.Posts.Add(p);
                _appDbContext.SaveChanges();
                if (data != null)
                {
                    return JsonConvert.SerializeObject(new { status = 1, message = "success", data = data });

                }
                return JsonConvert.SerializeObject(new { status = 0, message = "error on save cate into DB" });
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new { status = 0, message = e.ToString() });
            }
        }

        [HttpPost]
        public string UpdateNews(int id, string title, string content, string shortContent, string bannerImage, string status, string type)
        {
            try
            {
                Post p = _appDbContext.Posts.FirstOrDefault(x => x.Id == id);
                if (p == null)
                {
                    return JsonConvert.SerializeObject(new {status = 0, message = "Post id not found"});
                }
                p.Title = title;
                p.Contents = content;
                p.Status = status;
                p.ShortContent = shortContent;
                p.BannerImage = bannerImage;
                p.Type = type;
                _appDbContext.SaveChanges();
                return JsonConvert.SerializeObject(new { status = 1, message = "success" });
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new { status = 0, message = e.ToString() });
            }
        }
    }
}