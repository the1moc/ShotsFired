using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	// Holding information relating to one player.
	public class Player
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Player"/> class.
		/// </summary>
		/// <param name="username">The username.</param>
		public Player(string username)
		{
			Username = username;
			PlayerId = new Random().Next(0, 100000).ToString();
		}
		/// <summary>
		/// Gets or sets the player identifier.
		/// </summary>
		/// <value>
		/// The player identifier.
		/// </value>
		public string PlayerId { get; set; }

		/// <summary>
		/// Gets or sets the username.
		/// </summary>
		/// <value>
		/// The username.
		/// </value>
		public string Username { get; set; }

		/// <summary>
		/// Gets or sets the tank.
		/// </summary>
		/// <value>
		/// The tank.
		/// </value>
		public Tank Tank { get; set; }

		/// <summary>
		/// Gets or sets a value indicating whether this <see cref="Player"/> is ready.
		/// </summary>
		/// <value>
		///   <c>true</c> if ready; otherwise, <c>false</c>.
		/// </value>
		public bool Ready { get; set; }

	}
}