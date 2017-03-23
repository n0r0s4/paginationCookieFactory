/* @Game()
 * @author: norosa@programmer.net /github/n0r0s4
 * @date: 3 march
 * @description: Game review
 * @Attributes:
 * 		title
		type
		device
		owner
 * @methods:
 * 		set's and get's foor each attribute
 *
*/

function Game (title,type,device,owner)//he tenido que hacer el constructor directo para meterlo en el Json, he visto que no es mala práctica hacerlo
{

	this.title=title;
	this.type=type;
	this.device=device;
	this.owner=owner;


	this.setTitle = function (title){this.title=title;}
	this.setType = function (type){this.type=type;}
	this.setDevice = function (device){this.device=device;}
	this.setOwner = function (owner){this.owner=owner;}

	this.getTitle = function () {return this.title;}
	this.getType = function () {return this.type;}
	this.getDevice = function () {return this.device;}
	this.getOwner = function () {return this.owner;}
}
