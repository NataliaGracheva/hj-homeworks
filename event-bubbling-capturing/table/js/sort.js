'use strict';

function handleTableClick(event) {
  
  if (!event.target.classList.contains('prop__name')) {
  	return;
  }
  let field = event.target.dataset.propName;
  
  if (event.target.dataset.dir != 1) {
  	event.target.dataset.dir = 1;
  } else {
  	event.target.dataset.dir = -1;
  }
  let direction = event.target.dataset.dir;
  event.currentTarget.dataset.sortBy = field;
  sortTable(field, direction);
}
