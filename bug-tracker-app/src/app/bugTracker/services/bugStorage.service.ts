import { Bug } from '../models/Bug';
import * as uuid from 'uuid/v4';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BugStorageService{

	private storage = window.localStorage;
	private serviceEndPoint = 'http://localhost:3000/bugs';

	constructor(private httpClient : HttpClient){

	}
	save(bugData : Bug) : Observable<Bug> {
		if(!bugData.id){
			return this.httpClient
				.post<Bug>(this.serviceEndPoint, bugData);
		} else {
			return this.httpClient
				.put<Bug>(`${this.serviceEndPoint}/${bugData.id}`, bugData);
		}
	}

	remove(bugData : Bug) : Observable<any> {
		//this.storage.removeItem(bugData.id);
		return this.httpClient
				.delete<any>(`${this.serviceEndPoint}/${bugData.id}`)
	}

	getAll() : Observable<Bug[]>{
		/*let result = [];
		for(let index = 0, count = this.storage.length; index < count; index++){
			let key = this.storage.key(index),
				rawData = this.storage.getItem(key),
				bug = JSON.parse(rawData);
			result.push(bug);
		}
		return result;*/
		return this.httpClient
			.get<Bug[]>(this.serviceEndPoint);
	}
}