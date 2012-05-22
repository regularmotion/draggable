/**
 *   Draggable v 0.01
 */
function Draggable(id, callback) {
	this.el = (typeof id === 'string')? document.getElementById(id) : id;
	this.el.addEventListener(Draggable.EVT_START, this, false);
	
	this.state = Draggable.STATE.IDLE;
	this.callback = callback;
}

Draggable.STATE = {
	IDLE: 1001,
	DRAG: 1002
};
Draggable.MAX_Z = 100;
Draggable.isPending = false;
Draggable.isTouch = ('ontouchstart' in window)? true : false;
Draggable.EVT_START = Draggable.isTouch? 'touchstart' : 'mousedown';
Draggable.EVT_MOVE  = Draggable.isTouch? 'touchmove' : 'mousemove';
Draggable.EVT_END   = Draggable.isTouch? 'touchend' : 'mouseup';

Draggable.prototype.handleEvent = function(e) {
	var x = Draggable.isTouch? e.changedTouches[0].clientX : e.pageX,
		y = Draggable.isTouch? e.changedTouches[0].clientY : e.pageY;
	
	switch (e.type) {
		case Draggable.EVT_START:
			this.onDragStart(x, y);
			break;
		
		case Draggable.EVT_MOVE:
			this.onDragging(x, y);
			break;
		
		case Draggable.EVT_END:
			this.onDragEnd(x, y);
			break;
	}
	e.stopPropagation();
	e.preventDefault();
};

Draggable.prototype.onDragStart = function(x, y) {
	this.el.addClass('draggable');
	this.el.style['zIndex'] = Draggable.MAX_Z++;
	this.state = Draggable.STATE.DRAG;
	this.offsetX = this.el.offsetLeft;
	this.offsetY = this.el.offsetTop;
	this.startX = x;
	this.startY = y;
	
	document.documentElement.addEventListener(Draggable.EVT_MOVE, this, false);
	document.documentElement.addEventListener(Draggable.EVT_END, this, false);
};

Draggable.prototype.onDragging = function(x, y) {
	if ( this.state === Draggable.STATE.DRAG && !Draggable.isPending ) {
		this.el.style.top = (this.offsetY + (y - this.startY)) + 'px';
		this.el.style.left = (this.offsetX + (x - this.startX)) + 'px';
		this.pending();
		
		droppable.check(x, y);
	}
};

Draggable.prototype.onDragEnd = function(x, y) {
	var id = droppable.dropped(x, y, this.el.id);
	
	if ( id !== undefined ) {
		this.callback(id);
	}
	
	document.documentElement.removeEventListener(Draggable.EVT_MOVE, this, false);
	document.documentElement.removeEventListener(Draggable.EVT_END, this, false);
	this.state = Draggable.STATE.IDLE;
	this.el.removeClass('draggable');
};


/*
 * Draggable.EVT_MOVE fires too often(approximately more than 100 times per second)
 * so skip, if event is fired within 20ms.
 */
Draggable.prototype.pending = function() {
	Draggable.isPending = true;
		
	setTimeout(function(){
		Draggable.isPending = false;
	}, 20);
};