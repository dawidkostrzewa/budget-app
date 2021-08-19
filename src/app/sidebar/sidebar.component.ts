import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment } from '../home-page/+state/home-page.actions';

@Component({
    selector: 'app-sidebar',
    template: `<aside>
        <h2 class="sidebar-title">Ostatnie transakcje</h2>
        <mat-list (click)="clickList()">
            <mat-list-item>Wydatek1</mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>Wydatek2</mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>Wydatek3</mat-list-item>
        </mat-list>
    </aside>`,
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit(): void {}

    clickList() {
        this.store.dispatch(increment());
    }
}
