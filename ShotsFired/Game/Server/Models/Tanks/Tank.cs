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
		public Tank()
		{
			X = 400;
			Y = 0;
		}

		public int TankId { get; set; }

		public double X { get; set; }

		public double Y { get; set; }

		public int Armour { get; set; }

		public int Health { get; set; }

		public Projectile Projectile { get; set; }

		public int Power { get; set; }

		public int Fuel { get; set; }
	}
}