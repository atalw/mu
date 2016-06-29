import { Component } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
	moduleId: module.id,
	selector: 'mu-tabs',
	templateUrl: 'tabs.component.html'
})

export class TabsComponent {

	tabs: TabComponent[];

	constructor() {
		this.tabs = [];
	}
	selectTab(tab) {

		this._deactivateAllTabs(this.tabs);
		tab.active = true;
	}

	_deactivateAllTabs(tabs: TabComponent[]) {
		tabs.forEach((tab) => tab.active = false);
	}

	addTab(tab: TabComponent) {
		if (this.tabs.length === 0) {
			tab.active = true;
		}
		this.tabs.push(tab);
	}

}