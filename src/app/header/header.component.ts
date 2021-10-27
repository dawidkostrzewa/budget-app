import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <mat-toolbar color="primary">
            <header class="main-header">
                <h1 class="header-title"><a routerLink="/">DK budget app</a></h1>
                <span class="example-spacer"></span>
                <a routerLink="#">Zaplanuj kolejny miesiąc</a>
                <a routerLink="/year-summary">Podsumowanie roku</a>
            </header>
        </mat-toolbar>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
