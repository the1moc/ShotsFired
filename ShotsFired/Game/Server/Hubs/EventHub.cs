using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ShotsFired.Game.Server.Models.Players;
using ShotsFired.Game.Server.Models;

namespace ShotsFired.Games.Server.Hubs
{
    public class EventHub : Hub
    {
        // Called upon a left movement.
        public void MoveLeft(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).left(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        // Called upon a right movement.
        public void MoveRight(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).right(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        // Called upon a left turret rotation.
        public void RotateLeft(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).rotateLeft(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        // Called upon a right turret rotation.
        public void RotateRight(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).rotateRight(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        // Called upon a player increasing their power.
        public void IncreasePower(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).increasePower(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        // Called upon a player decreasing their power.
        public void DecreasePower(string playerId)
        {
            try
            {
                // Hate this, oversight on my part led to a weird design
                IPlayer player = GameHub.GetPlayerByPlayerId(playerId);
                GameInstance game = GameHub.GetGameInstanceById(player.CurrentGameInstanceId);
                List<string> allExceptCaller = game.Players.Where(p => p.ConnectionId != Context.ConnectionId).Select(p => p.ConnectionId).ToList();
                Clients.Clients(allExceptCaller).decreasePower(playerId);
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }

        public void CollisionTrigger(string playerId, int calculatedDamage)
        {
            try
            {
                IPlayer hitPlayer = GameHub.GetPlayerByPlayerId(playerId);
                hitPlayer.Tank.Health -= calculatedDamage;
                return;
            }
            catch (Exception e)
            {
                Clients.All.notEnoughClients(e);
            }
        }
    }
}