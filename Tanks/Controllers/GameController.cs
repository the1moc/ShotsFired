using System.Web.Mvc;
using System.Web.SessionState;
using ShotsFired.Models;

namespace ShotsFired.Controllers
{
	public class GameController : Controller
	{
		// Serve the game page which renders the client.
		[HttpGet]
		public ActionResult Game()
		{
			HttpContext.Session["Game"] = new World();

			return View();
		}

		// Generate the game object and return it to the clients.
		public ActionResult Play()
		{
			// Create the game object (from the host player).

			return null;
		}
	}
}