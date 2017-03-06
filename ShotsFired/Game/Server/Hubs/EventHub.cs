using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ShotsFired.Games.Server.Hubs
{
	public class EventHub : Hub
	{
		// Called upon a left movement.
		public void MoveLeft(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).left(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a right movement.
		public void MoveRight(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).right(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a left turret rotation.
		public void RotateLeft(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).rotateLeft(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a right turret rotation.
		public void RotateRight(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).rotateRight(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a player increasing their power.
		public void IncreasePower(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).increasePower(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a player decreasing their power.
		public void DecreasePower(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).decreasePower(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a player decreasing their power.
		public void LaunchProjectile(string playerId)
		{
			try
			{
				Clients.AllExcept(Context.ConnectionId).launchProjectile(playerId);
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}
	}
}