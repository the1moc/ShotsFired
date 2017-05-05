using Microsoft.Owin;
using Owin;

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
