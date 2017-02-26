using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ShotsFired.Models;

namespace ShotsFired.Hubs
{
	public class GameHub : Hub
	{
		private static List<Game> _games = new List<Game>();

		// Called when a player wants to host a new game.
		public void HostGame(int hostPlayerId)
		{
			Game newGame = new Game(_games.Count + 1);
			newGame.HostPlayerId = hostPlayerId;
			newGame.PlayerIds.Add(hostPlayerId);
			_games.Add(newGame);
			Clients.Caller.gameHostSuccess(newGame.InstanceId);
		}

		// Called when a player wants to join a pre-existing game.
		public void JoinGame(int gameId, int playerId)
		{
			Game desiredGame = _games.First(game => game.InstanceId == gameId);

			if (desiredGame == null)
			{
				Clients.Caller.onFailure("The game was not found on the server");
				return;
			}

			desiredGame.PlayerIds.Add(playerId);
			Clients.Caller.gameJoinSuccess(desiredGame.InstanceId);
		}
	}
}