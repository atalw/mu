import { Component } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'tab',
  inputs: [
    'title: tabTitle',
    'active'
  ],
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  title: string;
  active = this.active || false;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}