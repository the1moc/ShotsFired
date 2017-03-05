using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Game.Server.Models.Projectiles
{
	/// <summary>
	/// Standard projectile.
	/// </summary>
	public class StandardProjectile : IProjectile
	{
		public int ProjectileId { get { return 1; } }

		public string ProjectileName { get { return "Standard"; } }

		public int BaseDamage { get { return 40; } }

		public double DamageModifier { get { return 25; } }
	}
}