using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Models.Projectiles;

namespace ShotsFired.Game.Server.Models.Tanks
{
	/// <summary>
	/// A standard tank.
	/// </summary>
	/// <seealso cref="ShotsFired.Game.Server.Models.ITank" />
	public class Tank : ITank
	{
		public Tank(int xPosition)
		{
			X          = xPosition;
			Y          = 0;
			Armour     = 100;
			Health     = 100;
			Power      = 250;
			Fuel       = 200;
			Projectile = new StandardProjectile();
		}

		public double X { get; set; }

		public double Y { get; set; }

		public int Armour { get; set; }

		public int Health { get; set; }

		public IProjectile Projectile { get; set; }

		public int Power { get; set; }

		public int Fuel { get; set; }
	}
}