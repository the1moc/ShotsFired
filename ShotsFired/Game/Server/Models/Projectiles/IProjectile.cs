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
        int BaseDamage { get; set; }

        /// <summary>
        /// Gets or sets the damage modifier.
        /// </summary>
        /// <value>
        /// The damage modifier.
        /// </value>
        double DamageModifier { get; set; }
    }
}