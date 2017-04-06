// Create the game.
game = new Phaser.Game(800, 600, Phaser.AUTO);

// State creation.
game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Menu', Menu);
game.state.add('Lobby', Lobby);
game.state.add('Customization', Customization);
game.state.add('Game', Game);

// Start.
game.state.start('Boot');