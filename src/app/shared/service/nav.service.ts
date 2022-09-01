import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Category', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/category/upsert-category', title: 'Upsert Category', type: 'link' },
				{ path: '/category/list-category', title: 'Category List', type: 'link' }
			]
		},
		{
			title: 'Keyword', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/keyword/list-keyword', title: 'Keyword List', type: 'link' },
				{ path: '/keyword/create-keyword', title: 'Create Keyword', type: 'link' }
			]
		},
		{
			title: 'Article', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/article/list-article', title: 'Article List', type: 'link' },
				{ path: '/article/create-article', title: 'Create Article', type: 'link' }
			]
		},
		{
			title: 'Location', icon: 'box', type: 'sub', active: false, children: [
				{ path: '/location-mgmt/list-country', title: 'Country List', type: 'link' },
				{ path: '/location-mgmt/upsert-country', title: 'Create Country', type: 'link' }
			]
		},
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		}
	]
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
