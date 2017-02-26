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
						"~/Game/Client/Lib/jquery-3.1.1.min.js"));

			// signalR bundle.
			bundles.Add(new ScriptBundle("~/bundles/signalr").Include(
					"~/Game/Client/Lib/jquery.signalR-2.2.1.min.js"));

			// Phaser file bundle.
			bundles.Add(new ScriptBundle("~/bundles/phaser").Include(
					"~/Game/Client/Lib/phaser.min.js"));

			// Bundle all the client game scripts.
			ScriptBundle gameFiles = new ScriptBundle("~/bundles/game");
			gameFiles.IncludeDirectory("~/Game/Client/Entities/", "*.js");
			gameFiles.IncludeDirectory("~/Game/Client/States/", "*.js");
			bundles.Add(gameFiles);
		}
	}
}
