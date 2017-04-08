using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Models.Players
{
	// Holding information relating to custom settings for a tank.
	public class CustomSettings
	{
		public int BodyAssetId { get; set; }

		public int BodyAssetColour { get; set; }

		public int TurretAssetId { get; set; }

		public int TurretAssetColour { get; set; }

		public int ProjectileAssetId { get; set; }
	}
}