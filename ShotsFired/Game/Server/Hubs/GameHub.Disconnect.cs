using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using ShotsFired.Game.Server.Models.Players;

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
			IPlayer player    = FindPlayerByConnectionId(Context.ConnectionId);

			if (player == null)
			{
				return base.OnDisconnected(stopCalled);
			}

			if (player.IsInLobby || player.IsInActiveGame)
			{
				RemovePlayerFromGame(player.PlayerId, player.CurrentGameInstanceId);

				try
				{
					if (!player.IsInActiveGame)
					{
						Clients.AllExcept(Clients.Caller).leaveGameSucces(player.PlayerId);
					}

					else
					{
						Clients.AllExcept(Clients.Caller).leaveLobbySuccess(GetGameInstanceById(player.CurrentGameInstanceId));
					}
				}
				catch (Exception e)
				{
					// FIX THIS.
					Console.WriteLine("Nobody else is connected to the server");
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
			IPlayer playerToRemove = FindPlayerByConnectionId(Context.ConnectionId);

			// Remove from currently connected players and players on the current game instance.
			_players.Remove(playerToRemove);
		}
	}
}