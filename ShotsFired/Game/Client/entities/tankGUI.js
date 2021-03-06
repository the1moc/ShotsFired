﻿/// <reference path="../Lib/jquery-3.1.1.min.js" />
/// <reference path="../Lib/phaser.min.js" />

TankGUI = function (game, x, y, playerName, angle, power, health, armour) {
	//health decreases by 2.5 each time for 100
	//health decreases by 0.4 each time for 40
	this.maxHealth = health;
	this.maxArmour = armour;
	this.BARWIDTH = 40;
	this.BARHEIGHT = 2;

	
	// Power and angle variables
	this.vText = game.add.text(x, y - 66, power + ", " + angle, game.small_style);
	this.vText.anchor.setTo(0.5);

	// Player name
	this.playerName = game.add.text(x,y-52, playerName, game.small_style);
	this.playerName.anchor.setTo(0.5);

	//armour bar
	var aBMD = game.add.bitmapData(this.BARWIDTH, this.BARHEIGHT);
	aBMD.ctx.beginPath();
	aBMD.ctx.rect(0, 0, 180, 30);
	aBMD.ctx.fillStyle = '#3415B0';
	aBMD.ctx.fill();

	this.armourBar = game.add.sprite(x, y - 38, aBMD);
	this.armourBar.anchor.setTo(0.5);

	//health bar
	var hBMD = game.add.bitmapData(this.BARWIDTH,this.BARHEIGHT);
	hBMD.ctx.beginPath();
	hBMD.ctx.rect(0,0,180,30);
	hBMD.ctx.fillStyle = '#A61000';
	hBMD.ctx.fill();

	this.healthBar = game.add.sprite(x,y-34,hBMD);
	this.healthBar.anchor.setTo(0.5);
};

TankGUI.prototype = Object.create(Phaser.Sprite.prototype);
TankGUI.prototype.constructor = TankGUI;

TankGUI.prototype.damageArmourBar = function (value) {
	//value will be between 1 and 100
	var reduction = (this.BARWIDTH/this.maxArmour) * value;
	var currBarWidth = this.armourBar.width;

	if (this.currBarWidth > 0) {
		this.armourBar.width = currBarWidth - reduction;
	}
};

TankGUI.prototype.damageHealthBar = function (value) {
	//value will be between 1 and 100
	var reduction = (this.BARWIDTH / this.maxHealth) * value;
	var currBarWidth = this.healthBar.width;

	if (this.currBarWidth > 0) {
		this.healthBar.width = currBarWidth - reduction;
	}
};

TankGUI.prototype.updateAngleText = function (power, angle) {
	this.vText.text = power + ", " + Math.round(angle * -1);
};

TankGUI.prototype.moveGUI = function (x, y) {
	this.vText.x = x;
	this.vText.y = y - 45;

	this.healthBar.x = x;
	this.healthBar.y = y - 35;

	this.armourBar.x = x;
	this.armourBar.y = y - 30;

	this.playerName.x = x;
	this.playerName.y = y - 60;
};