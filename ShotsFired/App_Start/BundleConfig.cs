using System.Web;
using System.Web.Optimization;

namespace ShotsFired
{
	static public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			// jQuery bundle.
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Game/Client/lib/jquery-{version}.mins.js"));

			// signalR bundle.
			bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
					"~/Game/Client/lib/jquery.signalR-{version}.min.js"));

			// Phaser file bundle.
			bundles.Add(new ScriptBundle("~/bundles/phaser").Include(
					"~/Game/Client/lib/phaser.min.js"));

			// Bundle all the client game scripts.
			ScriptBundle gameFiles = new ScriptBundle("~/bundles/game");
			gameFiles.IncludeDirectory("~/Game/Client/entities/", "*.js");
			gameFiles.IncludeDirectory("~/Game/Client/states/", "*.js");
			bundles.Add(gameFiles);
		}
	}
}
