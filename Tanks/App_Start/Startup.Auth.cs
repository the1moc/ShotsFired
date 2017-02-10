using Owin;

namespace Tanks
{
	public partial class Startup
	{
		public void ConfigureAuth(IAppBuilder app)
		{
			app.MapSignalR();
		}
	}
}