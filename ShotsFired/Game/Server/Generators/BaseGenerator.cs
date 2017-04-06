using System;
using ShotsFired.Game.Server.Models.Projectiles;

namespace ShotsFired.Game.Server.Generators
{
	public class BaseGenerator
	{
		// Random object.
		private static Random _random = new Random();

		/// <summary>
		/// Gets the random number generator object.
		/// </summary>
		/// <value>
		/// The random.
		/// </value>
		public Random NumberGenerator { get { return _random; } }
	}
}