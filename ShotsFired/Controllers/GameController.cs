using System.Web.Mvc;
using System.Web.SessionState;

namespace ShotsFired.Controllers
{
	public class GameController : Controller
	{
		// Serve the game page which renders the client.
		[HttpGet]
		public ActionResult Game()
		{
			return View();
		}
	}
}