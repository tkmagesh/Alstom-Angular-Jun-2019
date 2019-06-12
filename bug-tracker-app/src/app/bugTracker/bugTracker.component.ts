import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];
	
	bugSortBy : string = '';
	bugSortByDescending : boolean = false;

	newBugName : string = '';
	/*private bugOperations : BugOperationsService;

	constructor(_bugOperations : BugOperationsService){
		this.bugOperations = _bugOperations;
	}*/

	constructor(private bugOperations : BugOperationsService){
		
	}

	
	ngOnInit(){
		

	}

	onAddNewClick(){
		let newBug : Bug = this.bugOperations.createNew(this.newBugName);
		this.bugs = [...this.bugs, newBug];
	}

	onBugNameClick(bugToToggle : Bug){
		let toggledBug = this.bugOperations.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	getClosedCount(){
		console.log('getClosedCount triggered');
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}