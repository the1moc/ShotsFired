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
		/// The games running on this server.
		/// </summary>
		private static List<GameInstance> _games = new List<GameInstance>();

		/// <summary>
		/// The players currently on the server.
		/// </summary>
		private static List<IPlayer> _players = new List<IPlayer>();

		/// <summary>
		/// Connects player to server.
		/// </summary>
		/// <param name="username">The username.</param>
		public void ConnectToServer(string username) {
			// New player object.
			Player newPlayer;

			if (username == null)
			{
				string names            = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/names.txt"));
				string[] seperatedNames = names.Split(',');
				newPlayer               = new Player(seperatedNames.ElementAt(new Random().Next(0, 20)), Context.ConnectionId);
			}
			else
				newPlayer = new Player(username, Context.ConnectionId);

			_players.Add(newPlayer);

			// Return the username and playerid to the client.
			Clients.Caller.connectPlayerSuccess(newPlayer);
		}

		/// <summary>
		/// Hosts the game.
		/// </summary>
		/// <param name="hostPlayerId">The host player identifier.</param>
		public void HostGame(string hostPlayerId) {
			IPlayer callingPlayer = FindPlayerByPlayerId(hostPlayerId);

			// Create a new game instance.
			//TODO: FIX THIS PLS
			GameInstance newGame = new GameInstance((_games.Count + 1).ToString(), callingPlayer.PlayerId);

			// Add the host player ID and add him to players.
			newGame.HostPlayerId = callingPlayer.PlayerId;
			newGame.Players.Add(callingPlayer);

			// Set properties on the player.
			callingPlayer.CurrentGameInstanceId = newGame.InstanceId;
			callingPlayer.IsInLobby             = true;
			callingPlayer.IsHost                = true;

			// Add that game to the list of games being played.
			_games.Add(newGame);

			// Tell the client that is hosting the game the game instance id (and generic information).
			Clients.Caller.gameHostSuccess(newGame);
		}

		/// <summary>
		/// Joins the game.
		/// </summary>
		/// <param name="gameId">The game identifier.</param>
		/// <param name="playerId">The player identifier.</param>
		public void JoinGame(string gameId, string playerId) {

			IPlayer callingPlayer = FindPlayerByPlayerId(playerId);
			GameInstance selectedGame = GetGameInstance(gameId);

			// If the player is not already in the lobby, add them.
			if (!selectedGame.Players.Contains(callingPlayer))
			{
				selectedGame.Players.Add(callingPlayer);

				callingPlayer.CurrentGameInstanceId = selectedGame.InstanceId;
				callingPlayer.IsInLobby             = true;

				Clients.All.gameJoinSuccess(selectedGame);
			}
		}

		/// <summary>
		/// Starts the game.
		/// </summary>
		/// <param name="gameId">The game identifier.</param>
		/// <param name="playerId">The player identifier.</param>
		public void StartGame(string gameId, string playerId)
		{
			// For now, just check the host player presses play.
			// Ideally all players have a ready check.
			IPlayer callingPlayer        = FindPlayerByPlayerId(playerId);
			GameInstance desiredGame     = GetGameInstance(gameId);

			// If the player is not already in the lobby, add them.
			if (!desiredGame.Players.Contains(callingPlayer))
			{
				desiredGame.Players.Add(callingPlayer);
				Clients.All.gameJoinSuccess(desiredGame.InstanceId, desiredGame.Players.Select(player => player.PlayerId).ToList(), desiredGame.HostPlayerId);
			}
			
		}

		/// <summary>
		/// Readies the specified player identifier.
		/// </summary>
		/// <param name="playerId">The player identifier.</param>
		public void Ready(string playerId)
		{
			IPlayer readyPlayer = FindPlayerByPlayerId(playerId);
			readyPlayer.Ready   = true;

			Clients.All.setReady(playerId);

			// Check to see if all other players are ready.
			if (_players.All(player => player.Ready)) {
				GameInstance gameToStart = GetGameInstance(readyPlayer.CurrentGameInstanceId);
				gameToStart.BeginGame();

				Clients.All.startGame(gameToStart);
			}
		}

		/// <summary>
		/// Gets the desired game instance.
		/// </summary>
		/// <param name="gameId">The game instance identifier.</param>
		/// <returns>An instance of the game</returns>
		public GameInstance GetGameInstance(string gameId) {
			try
			{
				return _games.Find(game => game.InstanceId == gameId);
			}
			catch (ArgumentNullException nullException)
			{
				throw new HubException("Game not found on the server.");
			}
		}

		/// <summary>
		/// Identify a player on the server by their player id.
		/// </summary>
		/// <param name="playerId">The player identifier.</param>
		/// <returns>The player that sent a request to the server.</returns>
		public IPlayer FindPlayerByPlayerId(string playerId)
		{
			try
			{
				return _players.Find(player => player.PlayerId == playerId);
			}
			catch (ArgumentException nullException)
			{
				throw new HubException("User not found on server.");
			}
		}
	}
}