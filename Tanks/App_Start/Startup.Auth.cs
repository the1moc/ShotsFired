using Owin;

namespace ShotsFired
{
	public partial class Startup
	{
		/// <summary>
		/// Configure how the application will respond in each HTTP request.
		/// </summary>
		/// <param name="app">The application.</param>
		public void ConfigureAuth(IAppBuilder app)
		{
			app.MapSignalR();
		}
	}
}