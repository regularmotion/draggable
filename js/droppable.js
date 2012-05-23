/**
 *   Draggable v 0.01
 */
var droppable = new function() {
	var inst = [];
	
	this.add = function(id, callback) {
		var el = (typeof id === 'string')? document.getElementById(id) : id,
			top = el.getTop(),
			left = el.getLeft();
		
		inst.push({el: el, callback: callback, dropped: false,
			minX: left, maxX: left+el.offsetWidth,
			minY: top,  maxY: top+el.offsetHeight});
	};
	
	this.remove = function(id) {
		var len = inst.length;
		
		while ( len-- ) {
			if ( inst[len].el.id === id ) {
				inst.splice(len, 1);
				break;
			}
		}
	};
	
	this.refresh = function() {
		var len = inst.length,
			top = 0, left = 0,
			el = {};
		
		while ( len-- ) {
			el = inst[len].el;
			top = el.getTop();
			left = el.getLeft();
			
			inst[len].minX = left;
			inst[len].minY = top;
			inst[len].maxX = left + el.offsetWidth;
			inst[len].maxY = top + el.offsetHeight;
		}
	};
	
	/*
	 *  Check draggable element moved to droppable element.
	 */
	this.check = function(x, y) {
		var len = inst.length,
			item = {};
		
		while ( len-- ) {
			item = inst[len];
			
			if ( (y > item.minY) && (y < item.maxY) ) {
				if ( (x > item.minX) && (x < item.maxX) ) {
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
		
		while ( len-- ) {
			item = inst[len];
			
			if ( (y > item.minY) && (y < item.maxY) ) {
				if ( (x > item.minX) && (x < item.maxX) ) {
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