/* @User()
 * @author: norosa@programmer.net /github/n0r0s4
 * @date: 3 march
 * @description: Object user
 * @Attributes:
 * 		dni: dni of the review
 * 		firstname: firstname of the review
 * 		email: email of the review
 * @methods:
 * 		set's and get's foor each attribute
 *
*/
function User (dni,firstname,email)////he tenido que hacer el constructor directo para meterlo en el Json, he visto que no es mala práctica hacerlo
{
	//Attributes declaration
	this.dni=dni;
	this.firstname=firstname;
	this.email=email;


	this.setDni = function (dni){this.dni=dni;}
	this.setFirstname = function (firstname){this.firstname=firstname;}
	this.setEmail = function (email){this.email=email;}


	this.getDni = function () {return this.dni;}
	this.getFirstname = function () {return this.firstname;}
	this.getEmail = function () {return this.email;}

}
