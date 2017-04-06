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
			Gravity = 100;

			// Possible creation of this variable later in project.
			Wind = 0;
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
		public double? Wind { get; set; }
	}
}