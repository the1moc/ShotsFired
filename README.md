# ShotsFired
Game inspired by Tanks

http://www.ultidev.com/Products/UWS-Cassini-Pro/Default.aspx

We are using this to host the server, rather than having the ball ache of setting up IIS etc for the demonstration. It will let us run the server easily from PC to PC with all the same features as IIS etc (y)

# Running software
- Clone it
- Open the solution up in VS (it should automatically restore all nuget packages)
- Run in chrome, (should redirect)
- Client contains all client .js files, and the main html page is within view


# Malcolm Tasks
- [x] Fix angle not rounding
- [x] Fix turret rotation
- [x] Remember to commit each task as a seperate set of changes
- [x] Fix comments
- [x] Put Client and Server side information (models etc) into their own "Game" folder
- [x] Tabify everything
- [x] Link menu to game (initial)
- [x] Integrate lobby between the menu and game with concurrent connections
- [x] Add menu + lobby functionality
- [x] Add tank sprite on new connection
- [ ] Send the projectile to the server and feed back to all other clients.
- [ ] Enable more lobby selection (keyboard event listener?)
- [ ] Make the server side more sexy
- [ ] Revert Rotations
- [ ] Look into world generation


fun tings to add to the game
- [x] Spawn tanks in the sky (parachute)
- [ ] Set maps
- [ ] Map selection button
- [ ] 
