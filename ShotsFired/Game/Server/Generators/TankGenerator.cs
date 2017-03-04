using System;
using ShotsFired.Game.Server.Models;
using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Generators
{
	public static class TankGenerator
	{
		public static Tank GenerateTank()
		{
			return new Tank();
		}
	}
}