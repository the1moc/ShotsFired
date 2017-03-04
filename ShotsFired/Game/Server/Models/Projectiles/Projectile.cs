using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Game.Server.Models.Projectiles
{
	/// <summary>
	/// The information for a projectile.
	/// </summary>
	public class Projectile : IProjectile
	{
		public int ProjectileId { get; set; }

		public string ProjectileName { get; set; }

		public int BaseDamage { get; set; }

		public double DamageModifier { get; set; }
	}
}