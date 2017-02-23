var ShotsFired = ShotsFired || {};

// Create the game.
ShotsFired.game = new Phaser.Game(800, 600, Phaser.AUTO);

// State creation.
ShotsFired.game.state.add('Boot', ShotsFired.Boot);
ShotsFired.game.state.add('Preload', ShotsFired.Preload);
ShotsFired.game.state.add('Menu', ShotsFired.Menu);
ShotsFired.game.state.add('Lobby', ShotsFired.Lobby);
ShotsFired.game.state.add('Game', ShotsFired.Game);

// Start.
ShotsFired.game.state.start('Boot');
