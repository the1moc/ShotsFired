using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	/// <summary>
	/// A game containing players and the world they are playing in.
	/// </summary>
	public class Game
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Instance"/> class.
		/// </summary>
		/// <param name="worldId">The instance identifier.</param>
		public Game(string instanceId, string hostPlayerId)
		{
			InstanceId   = instanceId;
			HostPlayerId = hostPlayerId;
			Players      = new List<Player>();
			World        = null;
		}

		/// <summary>
		/// Gets or sets the instance identifier.
		/// </summary>
		/// <value>
		/// The instance identifier.
		/// </value>
		public string InstanceId { get; set; }

		/// <summary>
		/// Gets or sets the host player identifier.
		/// </summary>
		/// <value>
		/// The host player identifier.
		/// </value>
		public string HostPlayerId { get; set; }

		/// <summary>
		/// Gets or sets the list of players.
		/// </summary>
		/// <value>
		/// The players.
		/// </value>
		public List<Player> Players { get; set; }

		/// <summary>
		/// Gets or sets the world.
		/// </summary>
		/// <value>
		/// The world.
		/// </value>
		public World World { get; set; }

	}
}