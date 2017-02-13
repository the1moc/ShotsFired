using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Tanks.Hubs
{
	public class EventHub : Hub
	{
		// Called upon a left movement.
		public void Left()
		{
			try
			{
				Clients.All.left();
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}

		// Called upon a right movement.
		public void Right()
		{
			try
			{
				Clients.All.right();
			}
			catch (Exception e)
			{
				Clients.All.notEnoughClients();
			}
		}
	}
}