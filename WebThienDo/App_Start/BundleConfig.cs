using System.Web.Optimization;

namespace WebThienDo
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/assets/js/bootstrap-hover-dropdown.min.js",
                      "~/assets/js/bootstrap-select.min.js",
                      "~/assets/js/bootstrap-slider.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/assets/js/owl.carousel.min.js",
                      "~/assets/js/echo.min.js",
                      "~/assets/js/jquery.easing-1.3.min.js",
                      "~/assets/js/jquery.rateit.min.js",
                      "~/assets/js/lightbox.min.js",
                      "~/assets/js/wow.min.js",
                      "~/assets/js/scripts.js",
                      "~/assets/js/switchstylesheet.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/assets/css/main.css",
                      "~/assets/css/green.css",
                      "~/assets/css/owl.carousel.css",
                      "~/assets/css/owl.transitions.css",
                      "~/assets/css/lightbox.css",
                      "~/assets/css/animate.min.css",
                      "~/assets/css/rateit.css",
                      "~/assets/css/bootstrap-select.min.css",
                      "~/assets/css/config.css",
                      "~/assets/css/green.css",
                      //"~/assets/css/blue.css",
                      //"~/assets/css/red.css",
                      //"~/assets/css/orange.css",
                      //"~/assets/css/dark-green.css",
                      "~/assets/css/font-awesome.min.css"));
        }
    }
}
