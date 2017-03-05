namespace ShotsFired.Game.Server.Models.Projectiles
{
	public interface IProjectile
	{
		/// <summary>
		/// Gets or sets the base damage.
		/// </summary>
		/// <value>
		/// The base damage.
		/// </value>
		int BaseDamage { get;}

		/// <summary>
		/// Gets or sets the damage modifier.
		/// </summary>
		/// <value>
		/// The damage modifier.
		/// </value>
		double DamageModifier { get; }

		/// <summary>
		/// Gets or sets the projectile Id.
		/// </summary>
		/// <value>
		/// The projectile Id.
		/// </value>
		int ProjectileId { get; }

		/// <summary>
		/// Gets or sets the projectile name.
		/// </summary>
		/// <value>
		/// The projectile name.
		/// </value>
		string ProjectileName { get; }
	}
}