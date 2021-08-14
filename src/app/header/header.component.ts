import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <mat-toolbar color="primary">
            <span>DK budget app</span>
            <span class="example-spacer"></span>
        </mat-toolbar>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
