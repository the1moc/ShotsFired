using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tanks.Models
{
	// Holding information relating to one player.
	public class Player
	{
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
	}
}