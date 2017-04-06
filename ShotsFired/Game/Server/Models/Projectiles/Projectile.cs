using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Game.Server.Models.Projectiles
{
    /// <summary>
    /// Standard projectile.
    /// </summary>
    public class Projectile : IProjectile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Projectile"/> class.
        /// </summary>
        /// <param name="damage">The damage.</param>
        /// <param name="damageModifier">The damage modifier.</param>
        public Projectile(int damage, int damageModifier)
        {
            BaseDamage     = damage;
            DamageModifier = damageModifier;
        }
        public int BaseDamage { get; set; }

        public double DamageModifier { get; set; }
    }
}