import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
	(p1 : any, p2 : any) : number
}

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {

	private getComparerFor(attrName) : Comparer {
		return function(p1:any, p2:any) : number {
	        if (p1[attrName] < p2[attrName]) return -1;
	        if (p1[attrName] > p2[attrName]) return 1;
	        return 0;
	    }
	}
	private getDescendingComparer(comparer : Comparer) : Comparer {
		return function (p1:any, p2:any) : number {
	        return comparer(p1, p2) * -1;
	    }
	}
	transform(list : any[], attrName : string, isDescending : boolean = false): any[] {
		if (!list || !list.length || !attrName)	return list;
		let comparer = this.getComparerFor(attrName);
		if (isDescending)
			comparer = this.getDescendingComparer(comparer);
		return list.sort(comparer);
	}
}








