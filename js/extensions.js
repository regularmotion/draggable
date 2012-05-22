/**
 *  Courtesy of Prototype (http://www.prototypejs.org)
 * 
 */
Element.prototype.hasClass = function(className) {
	var elementClassName = this.className;
	
	return (elementClassName.length > 0 && (elementClassName == className ||
	new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
};

Element.prototype.addClass = function(className) {
	if ( !this.hasClass(className) ) {
		this.className += (this.className ? ' ' : '') + className;
	}
	return this;
};

Element.prototype.removeClass = function(className) {
	var s = this.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ');
	
	this.className = s.replace(/^\s+/, '').replace(/\s+$/, '');
	
	return this;
};