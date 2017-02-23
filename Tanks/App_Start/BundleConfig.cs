using System.Web;
using System.Web.Optimization;

namespace Tanks
{
	static public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			// jQuery bundle.
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Client/lib/jquery-{version}.mins.js"));

			// signalR bundle.
			bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
					"~/Client/lib/jquery.signalR-{version}.min.js"));

			// Phaser file bundle.
			bundles.Add(new ScriptBundle("~/bundles/phaser").Include(
					"~/Client/lib/phaser.min.js"));

			// Bundle all the client game scripts.
			ScriptBundle gameFiles = new ScriptBundle("~/bundles/game");
			gameFiles.IncludeDirectory("~/Client/entities/", "*.js");
			gameFiles.IncludeDirectory("~/Client/states/", "*.js");
			bundles.Add(gameFiles);
		}
	}
}
