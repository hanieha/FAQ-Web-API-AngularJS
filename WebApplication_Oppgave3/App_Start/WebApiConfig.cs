using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Web_Api_1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {


            // Web API configuration and services

            // We API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }

            );
        }
    }
}
