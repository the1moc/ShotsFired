using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using ShotsFired.Game.Server.Models;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Games.Server.Hubs
{
    public partial class GameHub : Hub
    {
        /// <summary>
        /// The games running on this server.
        /// </summary>
        private static List<GameInstance> _games = new List<GameInstance>();

        /// <summary>
        /// The number of server slots.
        /// </summary>
        private static Dictionary<int, bool> _serverSlots = new Dictionary<int, bool>()
        {
            { 1, false },
            { 2, false },
            { 3, false },
            { 4, false },
            { 5, false },
            { 6, false },
            { 7, false },
            { 8, false },
            { 9, false }
        };

        /// <summary>
        /// The players currently on the server.
        /// </summary>
        private static List<IPlayer> _players = new List<IPlayer>();

        /// <summary>
        /// Hosts the game.
        /// </summary>
        /// <param name="hostPlayerId">The host player identifier.</param>
        public void HostGame(string hostPlayerId)
        {
            IPlayer callingPlayer = GetPlayerByPlayerId(hostPlayerId);

            // Check if the player is in a game right now.
            IsPlayerInGame(callingPlayer);

            // Check to see if there are any free slots.
            int freeSlot;
            try
            {
                // Not elegant but does the job for now.
                KeyValuePair<int, bool> serverSlot = _serverSlots.First(pair => !pair.Value);
                _serverSlots[serverSlot.Key]       = true;
                freeSlot                           = serverSlot.Key;
            }
            catch (ArgumentNullException e)
            {
                Clients.Caller.noFreeSlots();
                return;
            }

            GameInstance newGame = new GameInstance(freeSlot.ToString(), callingPlayer.PlayerId);

            // Add the host player ID and add him to players.
            newGame.HostPlayerId = callingPlayer.PlayerId;
            newGame.Players.Add(callingPlayer);

            // Set properties on the player.
            callingPlayer.CurrentGameInstanceId = newGame.InstanceId;
            callingPlayer.IsInLobby             = true;
            callingPlayer.IsHost                = true;

            // Add that game to the list of games being played.
            _games.Add(newGame);

            // Tell the client that is hosting the game the instance id (and generic information).
            Clients.Caller.gameHostSuccess(newGame);
        }

        /// <summary>
        /// Joins the game.
        /// </summary>
        /// <param name="gameId">The game identifier.</param>
        /// <param name="playerId">The player identifier.</param>
        public void JoinGame(string gameId, string playerId)
        {
            IPlayer callingPlayer = GetPlayerByPlayerId(playerId);
            GameInstance game     = GetGameInstanceById(gameId);

            // Tried to join a game that has not been setup.
            if (game == null)
            {
                Clients.Caller.noGameFound();
                return;
            }

            // Is the game is already running.
            if(game.IsGameRunning)
            {
                Clients.Caller.gameIsAlreadyRunning();
                return;
            }

            // Check if the player is in a game right now.
            IsPlayerInGame(callingPlayer);

            // If the player is not already in the lobby, add them.
            if (!game.Players.Contains(callingPlayer))
            {
                game.Players.Add(callingPlayer);

                callingPlayer.CurrentGameInstanceId = game.InstanceId;
                callingPlayer.IsInLobby             = true;

                Clients.Clients(game.Players.Select(player => player.ConnectionId).ToList()).gameJoinSuccess(game);
            }
        }

        /// <summary>
        /// Determines whether the player is in a game.
        /// </summary>
        public void IsPlayerInGame(IPlayer callingPlayer)
        {
            // Clear and close the lobby if this person is already hosting one.
            if (callingPlayer.IsHost)
            {
                CloseGame(callingPlayer.CurrentGameInstanceId);
                callingPlayer.IsHost = false;
            }
            else if (callingPlayer.IsInLobby)
            {
                RemovePlayerFromGame(callingPlayer.PlayerId, callingPlayer.CurrentGameInstanceId);
                callingPlayer.IsInLobby = false;
            }
        }

        /// <summary>
        /// Readies the specified player identifier.
        /// </summary>
        /// <param name="playerId">The player identifier.</param>
        public void Ready(string playerId)
        {
            IPlayer readyPlayer = GetPlayerByPlayerId(playerId);
            readyPlayer.Ready = true;
            GameInstance game = GetGameInstanceById(readyPlayer.CurrentGameInstanceId);

            // Tell everyone in that lobby the player is ready.
            Clients.Clients(game.Players.Select(player => player.ConnectionId).ToList()).setReady(playerId);

            // Check to see if all other players are ready.
            if (game.Players.All(player => player.Ready))
            {
                Clients.Caller.getLobbyState();
            }
        }

        /// <summary>
        /// Begins the game.
        /// </summary>
        /// <param name="playerId">The player identifier.</param>
        /// <param name="lobbyData">The lobby data.</param>
        public void BeginGame(string playerId, Lobby lobbyData)
        {
            GameInstance game = GetGameInstanceById(GetPlayerByPlayerId(playerId).CurrentGameInstanceId);
            game.BeginGame(lobbyData);
            Clients.All.startGame(game);
        }

        /// <summary>
        /// Removes the player from the game.
        /// </summary>
        /// <param name="playerId">The player identifier.</param>
        /// <param name="gameInstanceId">The game instance identifier.</param>
        public void RemovePlayerFromGame(string playerId, string gameInstanceId)
        {
            GameInstance game = GetGameInstanceById(gameInstanceId);
            IPlayer player    = GetPlayerByPlayerId(playerId);

            game.Players.Remove(player);

            // Close the game if there are no players left.
            if (game.Players.Count == 0)
            {
                CloseGame(game.InstanceId);
            }
        }

        /// <summary>
        /// Closes the game.
        /// </summary>
        public void CloseGame(string gameInstanceId)
        {
            // Clear the players in the game and remove them all, then delete it.
            GameInstance game = GetGameInstanceById(gameInstanceId);

            game.Players.ForEach(player => player.CurrentGameInstanceId = null);
            game.Players.ForEach(player => player.IsInLobby = false);
            Clients.Clients(game.Players.Select(player => player.ConnectionId).ToList()).Closed();

            // Not nice, temporary.
            _serverSlots[Int32.Parse(game.InstanceId)] = false;
            _games.Remove(game);
        }

        /// <summary>
        /// Gets the desired game instance.
        /// </summary>
        /// <param name="gameInstanceId">The game instance identifier.</param>
        /// <returns>An instance of the game</returns>
        public GameInstance GetGameInstanceById(string gameInstanceId) {
            try
            {
                return _games.Find(game => game.InstanceId == gameInstanceId);
            }
            catch (ArgumentNullException nullException)
            {
                throw new HubException("Game not found on the server.", nullException);
            }
        }

        /// <summary>
        /// Identify a player on the server by their player id.
        /// </summary>
        /// <param name="playerId">The player identifier.</param>
        /// <returns>The player that sent a request to the server.</returns>
        public static IPlayer GetPlayerByPlayerId(string playerId)
        {
            try
            {
                return _players.Find(player => player.PlayerId == playerId);
            }
            catch (ArgumentNullException nullException)
            {
                throw new HubException("User not found on server.", nullException);
            }
        }

        /// <summary>
        /// Identify a player on the server by their connection id.
        /// </summary>
        /// <param name="connectionId">The connection identifier.</param>
        /// <returns>The player that sent a request to the server.</returns>
        public static IPlayer FindPlayerByConnectionId(string connectionId)
        {
            try
            {
                return _players.Find(player => player.ConnectionId == connectionId);
            }
            catch (ArgumentException nullException)
            {
                throw new HubException("User not found on server.");
            }
        }

        /// <summary>
        /// Saves the selections.
        /// </summary>
        /// <param name="options">The options.</param>
        /// <exception cref="HubException">User not found on server.</exception>
        public void SaveSelections(dynamic options)
        {
            // TODO: Make this not so grim
            IPlayer player = FindPlayerByConnectionId(Context.ConnectionId);
            player.TankSettings.BodyAssetId = options.bodyAsset;
            player.TankSettings.BodyAssetColour = options.bodyAssetColour;
            player.TankSettings.TurretAssetId = options.turretAsset;
            player.TankSettings.TurretAssetColour = options.turretAssetColour;
            player.TankSettings.ProjectileAssetId = options.projectileAsset;

            Clients.Caller.customizationSaved();
        }
    }
}