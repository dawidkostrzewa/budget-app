import { Component } from '@angular/core';
import { HomePageFacade } from './+state/home-page.facade';
import { HomePageService } from './+state/home-page.service';

@Component({
    selector: 'app-home-page',
    template: `
        <main>
            <h2>Aktualny miesiac: {{ currentMonth }} {{ currentYear }}</h2>
            <div class="summary-cards">
                <mat-card class="color-green">
                    <mat-card-title>Wpływy</mat-card-title>
                    <mat-card-content>{{ income }}</mat-card-content>
                </mat-card>

                <mat-card class="color-red">
                    <mat-card-title>Wydatki</mat-card-title>
                    <mat-card-content>-{{ expense }}</mat-card-content>
                </mat-card>
                <mat-card [ngClass]="result > 0 ? 'color-green' : 'color-red'">
                    <mat-card-title>+/-</mat-card-title>
                    <mat-card-content>{{ result }}</mat-card-content>
                </mat-card>
            </div>
        </main>
    `,
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    private readonly today = new Date();
    currentMonth = this.today.toLocaleString('default', { month: 'long' });
    currentYear = this.today.getFullYear();

    income = 2000;
    expense = 1000;
    result = this.income - this.expense;

    constructor(private readonly homePageFacade: HomePageFacade, private readonly homePageService: HomePageService) {}

    ngOnInit() {
        this.homePageFacade.number$.subscribe((number) => {
            this.income = number;
        });

        this.homePageService.loadTransactions();
    }
}
