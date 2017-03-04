using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Models;

namespace ShotsFired.Game.Server.Generators
{
	public static class WorldGenerator
	{
		public static World GenerateWorld()
		{
			return new World();
		}
	}
}