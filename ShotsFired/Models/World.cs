using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	/// <summary>
	/// The information for the game world.
	/// </summary>
	public class World
	{
		/// <summary>
		/// Gets or sets the gravity of the world.
		/// </summary>
		/// <value>
		/// The gravity.
		/// </value>
		public double Gravity { get; set; }

		/// <summary>
		/// Gets or sets the players.
		/// </summary>
		/// <value>
		/// The players.
		/// </value>
		public IEnumerable<Player> Players { get; set; }

		/// <summary>
		/// Gets or sets the wind.
		/// </summary>
		/// <value>
		/// The wind.
		/// </value>
		public double? Wind { get; set; }
	}
}