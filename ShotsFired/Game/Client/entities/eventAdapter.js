function EventAdapter(eventHub, playerTank)
{ 
	this.mapEvents();

	function mapEvents() {
		evenHub.client.left = function() {
			playerTank.movement(-1);
		}
		evenHub.client.right = function() {
			playerTank.body.velocity.x = 250;
		}
		evenHub.client.turretLeft = function() {

		}
		evenHub.client.turretRight = function() {
		}
	}
}