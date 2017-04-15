using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Generators;
using ShotsFired.Game.Server.Models.Projectiles;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Game.Server.Models.Tanks
{
    /// <summary>
    /// A standard tank.
    /// </summary>
    /// <seealso cref="ShotsFired.Game.Server.Models.ITank" />
    public class Tank : ITank
    {
        public Tank(int xPosition, int armour, int health, CustomSettings tankSettings)
        {
            X      = xPosition;
            Y      = 300;
            Armour = armour;
            Health = health;
            Power  = 250;
            Fuel   = 200;
            BodyAssetId = tankSettings.BodyAssetId;
            BodyAssetColour = tankSettings.BodyAssetColour;
            TurretAssetId = tankSettings.TurretAssetId;
            TurretAssetColour = tankSettings.TurretAssetColour;
            ProjectileAssetId = tankSettings.ProjectileAssetId;

            ProjectileGenerator projectileGenerator = new ProjectileGenerator();
            Projectiles = new List<IProjectile>(4);
            for (int i = 0; i < 4; i++)
            {
                Projectiles.Add(projectileGenerator.GenerateProjectile());
            }
        }

        public double X { get; set; }

        public double Y { get; set; }

        public int Armour { get; set; }

        public int Health { get; set; }

        public List<IProjectile> Projectiles { get; set; }

        public int Power { get; set; }

        public int Fuel { get; set; }

        public int BodyAssetId { get; set; }

        public int BodyAssetColour { get; set; }

        public int TurretAssetId { get; set; }

        public int TurretAssetColour { get; set; }

        public int ProjectileAssetId { get; set; }

        public bool TankReady { get; set; }
    }
}