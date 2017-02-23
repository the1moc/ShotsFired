using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShotsFired.Startup))]
namespace ShotsFired
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
