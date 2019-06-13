import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';
import { Observable } from 'rxjs';
@Injectable()
export class BugOperationsService{

	constructor(private bugStorage : BugStorageService){

	}

	createNew(newBugName : string) :Observable<Bug> {
		let newBug : Bug = {
			id : '',
			name : newBugName,
			isClosed : false,
			createdAt : new Date()
		};
		return this.bugStorage.save(newBug);
	}

	toggle(bugToToggle : Bug) : Observable<Bug> {
		let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
		return this.bugStorage.save(toggledBug);
	}

	remove(bug : Bug) : Observable<any>{
		return this.bugStorage.remove(bug);
	}

	getAll() : Observable<Bug[]>{
		return this.bugStorage.getAll();
	}
}