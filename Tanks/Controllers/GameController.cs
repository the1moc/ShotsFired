using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tanks.Controllers
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