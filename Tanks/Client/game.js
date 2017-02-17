/// <reference path="../Scripts/phaser.min.js" />
/// <reference path="../Scripts/jquery-3.1.1.min.js" />
/// <reference path="../Scripts/jquery.signalR-2.2.1.min.js" />

// Create the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, "tanks", {
	preload: preload, create: create, update: update
});

function preload()
{
	game.stage.disableVisibilityChange = true;

	game.stage.backgroundColor = '#85b5e1';

	game.load.baseURL = 'http://examples.phaser.io/assets/';
	game.load.crossOrigin = 'anonymous';

	game.load.image('player', 'sprites/phaser-dude.png');
	game.load.image('platform', 'sprites/platform.png');

}

var player;
var platforms;
var cursors;
var jumpButton;

var eventHub;

function create()
{
	player = game.add.sprite(100, 200, 'player');

	game.physics.arcade.enable(player);

	player.body.collideWorldBounds = true;
	player.body.gravity.y = 500;

	platforms = game.add.physicsGroup();

	platforms.create(500, 150, 'platform');
	platforms.create(-200, 300, 'platform');
	platforms.create(400, 450, 'platform');

	platforms.setAll('body.immovable', true);

	cursors = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	eventHub = $.connection.eventHub;

	// Server sends left event.
	eventHub.client.left = function()
	{
		player.body.velocity.x = -250;
		console.log("left");
	}

	// Server sends right event.
	eventHub.client.right = function()
	{
		player.body.velocity.x = 250;
	}

	// Server sends right event.
	eventHub.client.jump = function()
	{
		player.body.velocity.y = -400;
	}

	// Start the connection.
	$.connection.hub.start();
}

function update()
{
	game.physics.arcade.collide(player, platforms);

	player.body.velocity.x = 0;

	if (cursors.left.isDown)
	{
		player.body.velocity.x = -250;
		eventHub.server.left();
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 250;
		eventHub.server.right();
	}

	if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
	{
		player.body.velocity.y = -400;
		eventHub.server.jump();
	}
}