using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	/// <summary>
	/// The information for a given projectile.
	/// </summary>
	public class Projectile
	{
		/// <summary>
		/// Gets or sets the projectile Id.
		/// </summary>
		/// <value>
		/// The projectile Id.
		/// </value>
		public int ProjectileId { get; set; }

		/// <summary>
		/// Gets or sets the projectile name.
		/// </summary>
		/// <value>
		/// The projectile name.
		/// </value>
		public string ProjectileName { get; set; }

		/// <summary>
		/// Gets or sets the base damage.
		/// </summary>
		/// <value>
		/// The base damage.
		/// </value>
		public int BaseDamage { get; set; }

		/// <summary>
		/// Gets or sets the damage modifier.
		/// </summary>
		/// <value>
		/// The damage modifier.
		/// </value>
		public double DamageModifier { get; set; }
	}
}