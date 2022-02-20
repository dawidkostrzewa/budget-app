import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedMaterialModule } from '@budgetapp/budget-ui/shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class BudgetUiFeatureHeaderModule {}
