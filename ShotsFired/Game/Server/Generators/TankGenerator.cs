using System;
using ShotsFired.Game.Server.Models;
using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Generators
{
	public static class TankGenerator
	{
		// Generate random X/Y.
		private static Random _random = new Random();

		public static Tank GenerateTank()
		{
			int xPosition = _random.Next(5, 795);
			return new Tank(xPosition);
		}
	}
}