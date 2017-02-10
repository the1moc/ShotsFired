using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Tanks.Startup))]
namespace Tanks
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
