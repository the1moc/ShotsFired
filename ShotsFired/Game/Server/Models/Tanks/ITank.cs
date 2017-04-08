using System.Collections.Generic;
using ShotsFired.Game.Server.Models.Projectiles;

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
		/// Gets or sets the projectiles for this tank.
		/// </summary>
		/// <value>
		/// The projectile currently selected.
		/// </value>
		List<IProjectile> Projectiles { get; set; }

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

		/// <summary>
		/// Gets or sets the body asset identifier.
		/// </summary>
		/// <value>
		/// The body asset identifier.
		/// </value>
		int BodyAssetId { get; set; }

		/// <summary>
		/// Gets or sets the body asset colour.
		/// </summary>
		/// <value>
		/// The body asset colour.
		/// </value>
		int BodyAssetColour { get; set; }

		/// <summary>
		/// Gets or sets the turret asset identifier.
		/// </summary>
		/// <value>
		/// The turret asset identifier.
		/// </value>
		int TurretAssetId { get; set; }

		/// <summary>
		/// Gets or sets the turret asset colour.
		/// </summary>
		/// <value>
		/// The turret asset colour.
		/// </value>
		int TurretAssetColour { get; set; }

		/// <summary>
		/// Gets or sets the projectile asset identifier.
		/// </summary>
		/// <value>
		/// The projectile asset identifier.
		/// </value>
		int ProjectileAssetId { get; set; }
	}
}