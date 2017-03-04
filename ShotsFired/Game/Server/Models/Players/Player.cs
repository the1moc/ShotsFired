using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Models.Players
{
	// Holding information relating to one player.
	public class Player : IPlayer
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Player"/> class.
		/// </summary>
		/// <param name="username">The username.</param>
		public Player(string username, string connectionId)
		{
			Username              = username;
			PlayerId              = new Random().Next(0, 100000).ToString();
			Tank                  = null;
			CurrentGameInstanceId = null;
			Ready                 = false;
			IsHost                = false;
			IsInActiveGame        = false;
			IsInLobby             = false;
			ConnectionId          = connectionId;
		}

		public string ConnectionId { get; set; }

		public string PlayerId { get; set; }

		public string Username { get; set; }

		public ITank Tank { get; set; }

		public bool Ready { get; set; }

		public bool IsInLobby { get; set; }

		public string CurrentGameInstanceId { get; set; }

		public bool IsHost { get; set; }

		public bool IsInActiveGame { get; set; }

	}
}