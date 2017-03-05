using System;
using System.Linq;
using System.Web.Hosting;
using Microsoft.AspNet.SignalR;
using ShotsFired.Game.Server.Models.Players;

namespace ShotsFired.Games.Server.Hubs
{
	public partial class GameHub : Hub
	{
		/// <summary>
		/// Connects player to server.
		/// </summary>
		/// <param name="username">The username.</param>
		public void ConnectToServer(string username)
		{
			// New player object.
			Player newPlayer;

			if (username == null)
			{
				string names = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/names.txt"));
				string[] seperatedNames = names.Split(',');
				newPlayer = new Player(seperatedNames.ElementAt(new Random().Next(0, 20)), Context.ConnectionId);
			}
			else {
				newPlayer = new Player(username, Context.ConnectionId);
			}

			AddPlayerToServer(newPlayer);

			// Return the username and playerid to the client.
			Clients.Caller.connectPlayerSuccess(newPlayer);
		}

		/// <summary>
		/// Adds the player to the server player list.
		/// </summary>
		/// <param name="player">The player.</param>
		public void AddPlayerToServer(Player player)
		{
			_players.Add(player);
		}
	}
}