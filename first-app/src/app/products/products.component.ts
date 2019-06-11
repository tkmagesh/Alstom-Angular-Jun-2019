import { Component } from '@angular/core';

@Component({
	selector : 'app-products',
	template : `
		<h3>Products</h3>
		<hr/>
		<div>{{productNames.length}}</div>
		<ol>
			<li *ngFor="let productName of productNames">{{productName}}</li>
		</ol>
	`
})
export class ProductsComponent{
	productNames : Array<string> = [
		'Pen'
		,'Pencil'
		,'Marker'
	];
}