using System;
using System.Web.Mvc;
using Newtonsoft.Json;
using WebThienDo.Business;
using WebThienDo.Models;

namespace WebThienDo.Controllers
{
    public class HomeController : Controller
    {
        private readonly PostsBusiness _postsBusiness;
        private readonly MessagesBusiness _messagesBusiness;
        private readonly TagsBusiness _tagsBusiness;
        private readonly ProductsBusiness _productsBusiness;
        private readonly CategoriesBusiness _categoriesBusiness;

        public HomeController()
        {
            var context = new AppDBContext();
            _postsBusiness = new PostsBusiness(context);
            _messagesBusiness = new MessagesBusiness(context);
            _tagsBusiness = new TagsBusiness(context);
            _productsBusiness = new ProductsBusiness(context);
            _categoriesBusiness = new CategoriesBusiness(context);
        }

        [HttpPost]
        public string SubmitMessage(string fullname, string email, string phone, string content)
        {
            try
            {
                if (string.IsNullOrEmpty(fullname) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(phone) ||
                    string.IsNullOrEmpty(content))
                {
                    return JsonConvert.SerializeObject(new {status = 0, message = "somefiled were empty"});
                }
                else
                {
                    var context = new AppDBContext();
                    Message message = context.Messages.Add(new Message
                    {
                        Contents = content,
                        Email = email,
                        Name = fullname,
                        Phone = phone,
                        DateTime = DateTime.Now
                    });
                    try
                    {
                        context.SaveChanges();
                        return JsonConvert.SerializeObject(new { status = 1, message = "success", data = message });
                    }
                    catch (Exception ex)
                    {
                        return JsonConvert.SerializeObject(new { status = 0, message = ex.ToString() });
                    }
                }
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new { status = 0, message = e.ToString() });
            }
        }

        public ActionResult Index()
        {
            ViewBag.hrefService = "#service";
            ViewBag.hrefProduct = "#product";
            ViewBag.hrefTeam = "#team";
            ViewBag.hrefContact = "#contact";
            ViewBag.hrefNews = "#about";
            ViewBag.hrefContact2 = "/Contact";

            ViewBag.Posts = _postsBusiness.GetAll();
            ViewBag.Messages = _messagesBusiness.GetAll();
            ViewBag.Tags = _tagsBusiness.GetAll();
            ViewBag.Products = _productsBusiness.GetAll();
            ViewBag.Categories = _categoriesBusiness.GetAll();
            return View();
        }
    }
}