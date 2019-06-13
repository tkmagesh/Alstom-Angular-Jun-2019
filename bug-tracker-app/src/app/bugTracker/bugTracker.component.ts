import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = [];
	
	bugSortBy : string = '';
	bugSortByDescending : boolean = false;

	
	constructor(private bugOperations : BugOperationsService
		, private httpClient : HttpClient){
		
	}	
	ngOnInit(){
		this.loadBugs();
	}

	private loadBugs(){
		this.bugOperations
			.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}

	onNewBugAdded(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	onBugNameClick(bugToToggle : Bug){
		this.bugOperations
			.toggle(bugToToggle)
			.subscribe(toggledBug => {
				this.bugs = this.bugs.map(bug => bug.id=== bugToToggle.id ? toggledBug : bug);		
			})
		
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugOperations
					.remove(closedBug)
					.subscribe(() => {}));
		this.loadBugs();
	}
}