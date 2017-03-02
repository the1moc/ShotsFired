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
		/// <summary>
		/// The games running on this server.
		/// </summary>
		private static List<Game> _games = new List<Game>();

		/// <summary>
		/// The players currently on the server.
		/// </summary>
		private static List<Player> _players = new List<Player>();

		/// <summary>
		/// Connects player to server.
		/// </summary>
		/// <param name="username">The username.</param>
		public void ConnectToServer(string username) {
			// New player object.
			Player newPlayer;

			if (username == null)
				newPlayer = new Player();
			else 
				newPlayer = new Player(username);

			_players.Add(newPlayer);

			// Return the username and playerid to the client.
			Clients.Caller.connectPlayerSuccess(newPlayer.PlayerId, newPlayer.Username);
		}

		/// <summary>
		/// Hosts the game.
		/// </summary>
		/// <param name="hostPlayerId">The host player identifier.</param>
		public void HostGame(string hostPlayerId) {
			Player callingPlayer = GetCallingPlayer(hostPlayerId);

			// Create a new game instance.
			//TODO: FIX THIS PLS
			Game newGame = new Game((_games.Count + 1).ToString(), callingPlayer.PlayerId);

			// Add the host player ID and add him to players.
			newGame.HostPlayerId = callingPlayer.PlayerId;
			newGame.Players.Add(callingPlayer);

			// Add that game to the list of games being played.
			_games.Add(newGame);

			// Tell the client that is hosting the game the game instance id (and generic information).
			Clients.Caller.gameHostSuccess(newGame.InstanceId, newGame.Players.Select(player => player.PlayerId).ToList() , hostPlayerId);
		}

		/// <summary>
		/// Joins the game.
		/// </summary>
		/// <param name="gameId">The game identifier.</param>
		/// <param name="playerId">The player identifier.</param>
		public void JoinGame(string gameId, string playerId) {
			try
			{
				Player callingPlayer = GetCallingPlayer(playerId);

				Game desiredGame = _games.First(game => game.InstanceId == gameId);

				// If the player is not already in the lobby, add them.
				if (!desiredGame.Players.Contains(callingPlayer))
				{
					desiredGame.Players.Add(callingPlayer);
					Clients.Caller.gameJoinSuccess(desiredGame.InstanceId, desiredGame.Players.Select(player => player.PlayerId).ToList(), desiredGame.HostPlayerId);
				}
			}
			catch (Exception e)
			{
				Clients.Caller.onFailure("The game was not found on the server.");
				return;
			}
		}

		/// <summary>
		/// Gets the desired game instance.
		/// </summary>
		/// <param name="gameId">The game instance identifier.</param>
		/// <returns></returns>
		public Game GetGame(string gameId) {
			try
			{
				return _games.Find(game => game.InstanceId == gameId);
			}
			catch (ArgumentNullException nullException)
			{
				return null;
			}
		}

		/// <summary>
		/// Gets the calling player.
		/// </summary>
		/// <param name="playerId">The player identifier.</param>
		/// <returns></returns>
		public Player GetCallingPlayer(string playerId)
		{
			return _players.Find(player => player.PlayerId == playerId);
		}
	}
}