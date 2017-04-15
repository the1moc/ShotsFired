using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Game.Server.Models
{
    /// <summary>
    /// The information for the game world.
    /// </summary>
    public class World
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="World"/> class.
        /// </summary>
        /// <param name="worldId">The world identifier.</param>
        public World()
        {
        }
        /// <summary>
        /// Gets or sets the gravity of the world.
        /// </summary>
        /// <value>
        /// The gravity.
        /// </value>
        public double Gravity { get; set; }

        /// <summary>
        /// Gets or sets the wind.
        /// </summary>
        /// <value>
        /// The wind.
        /// </value>
        public double Wind { get; set; }

        /// <summary>
        /// Gets or sets the health.
        /// </summary>
        /// <value>
        /// The health.
        /// </value>
        public int Health { get; set; }

        /// <summary>
        /// Gets or sets the turn timer.
        /// </summary>
        /// <value>
        /// The turn timer.
        /// </value>
        public double TurnTimer { get; set; }

        /// <summary>
        /// Gets or sets the map.
        /// </summary>
        /// <value>
        /// The map.
        /// </value>
        public int Map { get; set; }
    }
}