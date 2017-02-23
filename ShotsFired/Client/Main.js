var Tanks = Tanks || {};

// Create the game.
Tanks.game = new Phaser.Game(800, 600, Phaser.AUTO);

// State creation.
Tanks.game.state.add('Boot', Tanks.Boot);
Tanks.game.state.add('Preload', Tanks.Preload);
Tanks.game.state.add('Menu', Tanks.Menu);
Tanks.game.state.add('Lobby', Tanks.Lobby);
Tanks.game.state.add('Game', Tanks.Game);

// Start.
Tanks.game.state.start('Boot');