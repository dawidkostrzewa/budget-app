import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
  BudgetUiSharedModule,
  SharedMaterialModule,
} from '@budgetapp/budget-ui/shared';

@NgModule({
  imports: [CommonModule, BudgetUiSharedModule, SharedMaterialModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class BudgetUiFeatureSidebarModule {}
