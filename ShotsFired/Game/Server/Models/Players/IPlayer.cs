using ShotsFired.Game.Server.Models.Tanks;

namespace ShotsFired.Game.Server.Models.Players
{
    public interface IPlayer
    {
        /// <summary>
        /// Gets or sets the connection identifier of the client.
        /// </summary>
        /// <value>
        /// The connection identifier.
        /// </value>
        string ConnectionId { get; set; }

        /// <summary>
        /// Gets or sets which game instance id this player is in.
        /// </summary>
        /// <value>
        /// The game instance.
        /// </value>
        string CurrentGameInstanceId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this player is host.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this player is host; otherwise, <c>false</c>.
        /// </value>
        bool IsHost { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this player is in active game.
        /// </summary>
        /// <value>
        /// <c>true</c> if this player is in active game; otherwise, <c>false</c>.
        /// </value>
        bool IsInActiveGame { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this player is in lobby.
        /// </summary>
        /// <value>
        /// <c>true</c> if this player is in lobby; otherwise, <c>false</c>.
        /// </value>
        bool IsInLobby { get; set; }

        /// <summary>
        /// Gets or sets the player identifier.
        /// </summary>
        /// <value>
        /// The player identifier.
        /// </value>
        string PlayerId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="Player"/> is ready.
        /// </summary>
        /// <value>
        ///   <c>true</c> if ready; otherwise, <c>false</c>.
        /// </value>
        bool Ready { get; set; }

        /// <summary>
        /// Gets or sets the tank.
        /// </summary>
        /// <value>
        /// The tank.
        /// </value>
        ITank Tank { get; set; }

        /// <summary>
        /// Gets or sets the username.
        /// </summary>
        /// <value>
        /// The username.
        /// </value>
        string Username { get; set; }

        /// <summary>
        /// Gets or sets the body asset identifier.
        /// </summary>
        /// <value>
        /// The body asset identifier.
        /// </value>
        int BodyAssetId { get; set; }

        /// <summary>
        /// Gets or sets the body asset colour.
        /// </summary>
        /// <value>
        /// The body asset colour.
        /// </value>
        int BodyAssetColour { get; set; }

        /// <summary>
        /// Gets or sets the turret asset identifier.
        /// </summary>
        /// <value>
        /// The turret asset identifier.
        /// </value>
        int TurretAssetId { get; set; }

        /// <summary>
        /// Gets or sets the turret asset colour.
        /// </summary>
        /// <value>
        /// The turret asset colour.
        /// </value>
        int TurretAssetColour { get; set; }

        /// <summary>
        /// Gets or sets the projectile asset identifier.
        /// </summary>
        /// <value>
        /// The projectile asset identifier.
        /// </value>
        int ProjectileAssetId { get; set; }
    }
}