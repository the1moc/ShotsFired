using System;
using ShotsFired.Game.Server.Models.Projectiles;

namespace ShotsFired.Game.Server.Generators
{
    public class ProjectileGenerator : BaseGenerator
    {
        public IProjectile GenerateProjectile()
        {
            int damage = NumberGenerator.Next(40, 99);
            int damageModifier = NumberGenerator.Next(10, 50);
            return new Projectile(damage, damageModifier);
        }
    }
}