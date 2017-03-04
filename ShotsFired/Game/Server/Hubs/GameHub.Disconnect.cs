using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Microsoft.AspNet.SignalR;
using ShotsFired.Game.Server.Generators;
using ShotsFired.Game.Server.Models.Projectiles;
using ShotsFired.Game.Server.Models.Players;
using ShotsFired.Game.Server.Models.Tanks;
using ShotsFired.Game.Server.Models;
using System.Threading.Tasks;

namespace ShotsFired.Games.Server.Hubs
{
	public partial class GameHub : Hub
	{
		/// <summary>
		/// Called when a connection disconnects from this hub gracefully or due to a timeout.
		/// </summary>
		/// <param name="stopCalled">true, if stop was called on the client closing the connection gracefully;
		/// false, if the connection has been lost for longer than the
		/// <see cref="P:Microsoft.AspNet.SignalR.Configuration.IConfigurationManager.DisconnectTimeout" />.
		/// Timeouts can be caused by clients reconnecting to another SignalR server in scaleout.</param>
		/// <returns>
		/// A <see cref="T:System.Threading.Tasks.Task" />
		/// </returns>
		public override Task OnDisconnected(bool stopCalled)
		{
			RemovePlayer();
			return base.OnDisconnected(stopCalled);
		}

		/// <summary>
		/// Remove player from list of players on disconnect.
		/// </summary>
		public void RemovePlayer()
		{
			_players.Remove(FindPlayerByConnectionId());
		}

		/// <summary>
		/// Identify a player on the server by their connection id.
		/// </summary>
		/// <param name="playerId">The player identifier.</param>
		/// <returns>The player that sent a request to the server.</returns>
		public IPlayer FindPlayerByConnectionId()
		{
			try
			{
				return _players.Find(player => player.ConnectionId == Context.ConnectionId);
			}
			catch (ArgumentException nullException)
			{
				throw new HubException("User not found on server.");
			}
		}
	}
}