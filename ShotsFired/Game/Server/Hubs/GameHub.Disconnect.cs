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
			IPlayer player    = FindPlayerByConnectionId();
			if (player.IsInLobby || player.IsInActiveGame)
			{
				RemovePlayerFromGame(player.PlayerId, player.CurrentGameInstanceId);

				if (!player.IsInActiveGame)
				{
					Clients.AllExcept(Clients.Caller).leaveGameSucces(player.PlayerId);
				}

				else
				{
					Clients.AllExcept(Clients.Caller).leaveLobbySuccess(player.PlayerId);
				}
			}

			RemovePlayerFromServer();

			return base.OnDisconnected(stopCalled);
		}

		/// <summary>
		/// Removes the player from server.
		/// </summary>
		public void RemovePlayerFromServer()
		{
			IPlayer playerToRemove = FindPlayerByConnectionId();

			// Remove from currently connected players and players on the current game instance.
			_players.Remove(playerToRemove);
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