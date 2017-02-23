using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	/// <summary>
	/// Holding information relating to one player.
	/// </summary>
	public class Tank
	{
		/// <summary>
		/// Gets or sets the tank identifier.
		/// </summary>
		/// <value>
		/// The tank identifier.
		/// </value>
		public int TankId { get; set; }

		/// <summary>
		/// Gets or sets the X co-ordinate.
		/// </summary>
		/// <value>
		/// The x co-ordinate.
		/// </value>
		public double X { get; set; }

		/// <summary>
		/// Gets or sets the y co-ordinate.
		/// </summary>
		/// <value>
		/// The y co-ordinate.
		/// </value>
		public double Y { get; set; }

		/// <summary>
		/// Gets or sets the armour.
		/// </summary>
		/// <value>
		/// The armour of the tank.
		/// </value>
		public int Armour { get; set; }

		/// <summary>
		/// Gets or sets the health.
		/// </summary>
		/// <value>
		/// The health of the tank.
		/// </value>
		public int Health { get; set; }

		/// <summary>
		/// Gets or sets the projectile.
		/// </summary>
		/// <value>
		/// The projectile currently selected.
		/// </value>
		public Projectile Projectile { get; set; }

		/// <summary>
		/// Gets or sets the power.
		/// </summary>
		/// <value>
		/// The power of the proectile.
		/// </value>
		public int Power { get; set; }

		/// <summary>
		/// Gets or sets the fuel.
		/// </summary>
		/// <value>
		/// The fuel for the tank.
		/// </value>
		public int Fuel { get; set; }
	}
}