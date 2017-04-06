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
        /// Add player to the server player list.
        /// </summary>
        /// <param name="username">The username.</param>
        public void AddPlayerToServerList(string username)
        {
            // New player object.
            Player newPlayer;

            //can now get 25,920 different combinations of names
            //if (username == null)
            //{
            //	string names = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/names.txt"));
            //	string[] seperatedNames = names.Split(',');
            //	newPlayer = new Player(seperatedNames.ElementAt(new Random().Next(0, 20)), Context.ConnectionId);
            //}
            //else {
            //	newPlayer = new Player(username, Context.ConnectionId);
            //}

            if(username == null)
            {
                string ranks = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/ranks.txt"));
                string[] seperatedRanks = ranks.Split(',');
                
                string firstNames = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/FirstNames.txt"));
                string[] seperatedFirstNames = firstNames.Split(',');
                string lastNames = System.IO.File.ReadAllText(HostingEnvironment.MapPath(@"~/Content/LastNames.txt"));
                string[] seperatedLastNames = lastNames.Split(',');
                string generatedUsername = seperatedRanks.ElementAt(new Random().Next(0, 18)) + ". "+ seperatedFirstNames.ElementAt(new Random().Next(0, 40)) + " " + seperatedLastNames.ElementAt(new Random().Next(0, 36));
                newPlayer = new Player(generatedUsername, Context.ConnectionId);
            }
            else
            {
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