using System;
using ShotsFired.Game.Server.Models;
using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Generators
{
    public class TankGenerator : BaseGenerator
    {
        public Tank GenerateTank()
        {
            int xPosition = NumberGenerator.Next(50, 700);

            int armour = 690;
            int health = 100;
            //TODO: If passing selected lobby details, pass them here.
            return new Tank(xPosition, armour, health);
        }
    }
}