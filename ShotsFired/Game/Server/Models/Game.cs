using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShotsFired.Models
{
	/// <summary>
	/// The instance that contains a seperate game.
	/// </summary>
	public class Game
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Instance"/> class.
		/// </summary>
		/// <param name="worldId">The instance identifier.</param>
		public Game(int instanceId)
		{
			InstanceId   = instanceId;
			HostPlayerId = -1;
			PlayerIds    = new List<int>();
			World        = null;
		}

		/// <summary>
		/// Gets or sets the instance identifier.
		/// </summary>
		/// <value>
		/// The instance identifier.
		/// </value>
		public int InstanceId { get; set; }

		/// <summary>
		/// Gets or sets the host player identifier.
		/// </summary>
		/// <value>
		/// The host player identifier.
		/// </value>
		public int HostPlayerId { get; set; }

		/// <summary>
		/// Gets or sets the list of player identifiers.
		/// </summary>
		/// <value>
		/// The player identifiers.
		/// </value>
		public List<int> PlayerIds { get; set; }

		/// <summary>
		/// Gets or sets the world.
		/// </summary>
		/// <value>
		/// The world.
		/// </value>
		public World World { get; set; }

	}
}