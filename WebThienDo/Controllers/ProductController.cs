using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using WebThienDo.Business;
using WebThienDo.Models;

namespace WebThienDo.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppDBContext _appDbContext;
        private ProductsBusiness _productsBusiness;

        public ProductController()
        {
            _appDbContext = new AppDBContext();
            _productsBusiness = new ProductsBusiness(_appDbContext);
        }

        // GET: Product
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

        public ActionResult ListProduct()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        public ActionResult Category()
        {
            ViewBag.hrefService = "/Service";
            ViewBag.hrefProduct = "/Product";
            ViewBag.hrefAbout = "/";
            ViewBag.hrefTeam = "/";
            ViewBag.hrefContact = "/";
            ViewBag.hrefNews = "/News";
            ViewBag.hrefContact2 = "/Contact";

            return View();
        }

        [HttpGet]
        public string GetListCates()
        {
            List<Category> categories = _appDbContext.Categories.OrderByDescending(x => x.Order).ToList();
            return JsonConvert.SerializeObject(new { status = 1, message = "success", data = categories });
        }

        [HttpGet]
        public string GetListProducts()
        {
            List<Product> products = _appDbContext.Products
                .OrderByDescending(x => x.Order)
                .Include(x => x.Category)
                .Include(x => x.Images)
                .ToList();
            return JsonConvert.SerializeObject(new { status = 1, message = "success", data = products });
        }

        [HttpPost]
        public string AddCate(string title, string des)
        {
            try
            {
                var tmp = _appDbContext.Categories.OrderByDescending(x => x.Order).ToList();
                int lastOrder = 0;
                if (tmp.Count > 0)
                {
                    lastOrder = tmp[0].Order;
                }
                Category category = new Category
                {
                    Name = title,
                    Descriptions = des,
                    Order = lastOrder + 1,
                    Status = "show"
                };
                Category data = _appDbContext.Categories.Add(category);
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
        public string UpdateProduct(int id, int cateId, string title, string des, int order, string status, string[] imgs)
        {
            try
            {
                Category category = _appDbContext.Categories.FirstOrDefault(x => x.Id == cateId);
                Product product = _appDbContext.Products.Include(x => x.Images).FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return JsonConvert.SerializeObject(new { status = 0, message = "Product id not found!" });
                }

                product.Category = category;
                product.Content = des;
                product.Descriptions = des;
                product.Title = title;
                product.Status = status;
                product.Order = order;

                product.Images.RemoveAll(x => !x.Url.Equals(""));
                foreach (string t in imgs)
                {
                    Image image = new Image
                    {
                        Url = t
                    };
                    product.Images.Add(image);
                    _appDbContext.Images.Add(image);
                }
                _appDbContext.SaveChanges();
                return JsonConvert.SerializeObject(new { status = 1, message = "success" });
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new { status = 0, message = e.ToString() });
            }
        }

        [HttpPost]
        public string UpdateCate(int cateId, string name, string des, int order, string status)
        {
            Category category = _appDbContext.Categories.FirstOrDefault(x => x.Id == cateId);
            if (category == null)
            {
                return JsonConvert.SerializeObject(new { status = 0, message = "cate id not found" });
            }
            category.Name = name;
            category.Descriptions = des;
            category.Order = order;
            category.Status = status;
            _appDbContext.SaveChanges();
            return JsonConvert.SerializeObject(new { status = 1, message = "success" });
        }

        [HttpPost]
        public string AddProduct(int cateId, string title, string[] imgs, string content)
        {
            try
            {
                var tmp = _appDbContext.Products.OrderByDescending(x => x.Order).ToList();
                int lastOrder = 0;
                if (tmp.Count > 0)
                {
                    lastOrder = tmp[0].Order;
                }
                List<Image> imgsList = new List<Image>();
                Category category = _appDbContext.Categories.FirstOrDefault(x => x.Id == cateId);

                Product product = new Product
                {
                    Category = category,
                    Content = content,
                    Title = title,
                    Descriptions = content,
                    Order = lastOrder + 1,
                    Status = "show"
                };
                for (int i = 0; i < imgs.Length; i++)
                {
                    Image image = new Image
                    {
                        Url = imgs[i]
                    };
                    imgsList.Add(image);
                    _appDbContext.Images.Add(image);
                }
                product.Images = imgsList;
                Product data = _appDbContext.Products.Add(product);
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
    }
}