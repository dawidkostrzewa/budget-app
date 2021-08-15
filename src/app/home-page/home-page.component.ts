import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    template: `
        <main>
            <h1>Home Page</h1>
            <div>Current month: {{ currentMonth }}</div>
            <div class="summary-cards">
                <mat-card>
                    <mat-card-title>Wpływy</mat-card-title>
                    <mat-card-content>content</mat-card-content>
                </mat-card>

                <mat-card>
                    <mat-card-title>Wydatki</mat-card-title>
                    <mat-card-content>content</mat-card-content>
                </mat-card>
                <mat-card>
                    <mat-card-title>+/-</mat-card-title>
                    <mat-card-content>content</mat-card-content>
                </mat-card>
            </div>
        </main>
    `,
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    private readonly today = new Date();
    currentMonth = this.today.toLocaleString('default', { month: 'long' });
}
