﻿using ShotsFired.Game.Server.Models.Projectiles;

namespace ShotsFired.Game.Server.Models.Tanks
{
	public interface ITank
	{
		/// <summary>
		/// Gets or sets the armour.
		/// </summary>
		/// <value>
		/// The armour of the tank.
		/// </value>
		int Armour { get; set; }

		/// <summary>
		/// Gets or sets the fuel.
		/// </summary>
		/// <value>
		/// The fuel for the tank.
		/// </value>
		int Fuel { get; set; }

		/// <summary>
		/// Gets or sets the health.
		/// </summary>
		/// <value>
		/// The health of the tank.
		/// </value>
		int Health { get; set; }

		/// <summary>
		/// Gets or sets the power.
		/// </summary>
		/// <value>
		/// The power of the proectile.
		/// </value>
		int Power { get; set; }

		/// <summary>
		/// Gets or sets the projectile.
		/// </summary>
		/// <value>
		/// The projectile currently selected.
		/// </value>
		IProjectile Projectile { get; set; }

		/// <summary>
		/// Gets or sets the X co-ordinate.
		/// </summary>
		/// <value>
		/// The x co-ordinate.
		/// </value>
		double X { get; set; }

		/// <summary>
		/// Gets or sets the y co-ordinate.
		/// </summary>
		/// <value>
		/// The y co-ordinate.
		/// </value>
		double Y { get; set; }
	}
}