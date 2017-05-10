using System;
using ShotsFired.Game.Server.Models.Tanks;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Game.Server.Generators
{
    public class TankGenerator : BaseGenerator
    {
        public Tank GenerateTank(CustomSettings tankSettings)
        {
            int xPosition = NumberGenerator.Next(50, 700);

            int armour = 0;
            int health = 100;

            //TODO: If passing selected lobby details, pass them here.
            return new Tank(xPosition, armour, health, tankSettings);
        }
    }
}