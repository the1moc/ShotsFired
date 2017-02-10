using System.Web;
using System.Web.Optimization;

namespace Tanks
{
	static public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
					"~/Scripts/jquery.signalR-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/phaser").Include(
					"~/Scripts/phaser.min.js"));

			bundles.Add(new ScriptBundle("~/bundles/game").Include(
					"~/Client/game.js"));
		}
	}
}
