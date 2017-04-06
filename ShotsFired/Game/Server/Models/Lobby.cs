using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Generators;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Game.Server.Models
{
    /// <summary>
    /// A game containing players and the world they are playing in.
    /// </summary>
    public class Lobby
    {
        /// <summary>
        /// Gets or sets the number of the map.
        /// </summary>
        /// <value>
        /// The instance identifier.
        /// </value>
        public int Map { get; set; }

        /// <summary>
        /// Gets or sets the health each player will have.
        /// </summary>
        /// <value>
        /// The world.
        /// </value>
        public int Health { get; set; }

        /// <summary>
        /// Gets or sets the game wind.
        /// </summary>
        /// <value>
        /// The world.
        /// </value>
        public int Wind { get; set; }

        /// <summary>
        /// Gets or sets the turn timer.
        /// </summary>
        /// <value>
        /// The turn timer.
        /// </value>
        public int TurnTimer { get; set; }

        /// <summary>
        /// Gets or sets a value indicating if shot tracers are desired.
        /// </summary>
        /// <value>
        ///   <c>true</c> if shots traces are wanted; otherwise, <c>false</c>.
        /// </value>
        public bool ShotTracer { get; set; }
    }
}