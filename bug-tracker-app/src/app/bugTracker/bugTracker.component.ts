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
	/*private bugOperations : BugOperationsService;

	constructor(_bugOperations : BugOperationsService){
		this.bugOperations = _bugOperations;
	}*/

	constructor(private bugOperations : BugOperationsService){
		
	}

	ngOnInit(){
		this.bugs.push({ name : 'Server communication failure', isClosed : false});
		this.bugs.push({ name : 'User actions not recognized', isClosed : true});
		this.bugs.push({ name : 'Data integrity checks failed', isClosed : false});
		this.bugs.push({ name : 'Application not responding', isClosed : false});

	}

	onAddNewClick(newBugName : string){
		let newBug : Bug = this.bugOperations.createNew(newBugName);
		this.bugs.push(newBug);
	}

	onBugNameClick(bugToToggle : Bug){
		this.bugOperations.toggle(bugToToggle);
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	getClosedCount(){
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}