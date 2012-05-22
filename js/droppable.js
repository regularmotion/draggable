/**
 *   Draggable v 0.01
 */
var droppable = new function() {
	var inst = [];
	
	this.add = function(id, callback) {
		var el = (typeof id === 'string')? document.getElementById(id) : id;
		
		inst.push({el: el, callback: callback, dropped: false,
			minX: el.offsetLeft, maxX: el.offsetLeft+el.offsetWidth,
			minY: el.offsetTop,  maxY: el.offsetTop+el.offsetHeight});
	};
	
	this.remove = function(id) {
		var len = inst.length;
		
		while( len-- ) {
			if ( inst[len].el.id === id ) {
				inst.splice(len, 1);
				break;
			}
		}
	};
	
	
	/*
	 *  Check draggable element moved to droppable element.
	 */
	this.check = function(x, y) {
		var len = inst.length,
			item = {};
		
		while( len-- ) {
			item = inst[len];
			
			if( (y > item.minY) && (y < item.maxY) ) {
				if( (x > item.minX) && (x < item.maxX) ) {
					if ( !item.dropped ) {
						item.el.addClass('droppable');
						item.dropped = true;
					}
					continue;
				}
			}
			
			if ( item.dropped ) {
				item.el.removeClass('droppable');
				item.dropped = false;
			}
		}
	};
	
	
	/*
	 *  Check draggable element dropped at droppable element.
	 */
	this.dropped = function(x, y, id) {
		var len = inst.length,
			item = {};
		
		while( len-- ) {
			item = inst[len];
			
			if( (y > item.minY) && (y < item.maxY) ) {
				if( (x > item.minX) && (x < item.maxX) ) {
					item.el.removeClass('droppable');
					
					if ( typeof item.callback === 'function' ) {
						item.callback(id);
					}
					return item.el.id;
				}
			}
		}
	};
};