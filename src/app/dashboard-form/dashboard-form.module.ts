import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWrapperComponent } from './BusinessComponents/dashboard-wrapper/dashboard-wrapper.component';
// import { StoryActions } from '@appRoot/modules/navigation/story/store/story.action';
// import { SharedModule } from '@appRoot/shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { DashboardRightSidePanelComponent } from './FunctionalComponents/dashboard-right-side-panel/dashboard-right-side-panel.component';
import { DashboardViewComponent } from './FunctionalComponents/dashboard-view/dashboard-view.component';
import { TitleAccordionComponent } from './FunctionalComponents/title-accordion/title-accordion.component';
import { InputTextPanelComponent } from './FunctionalComponents/FormControls/input-text-panel/input-text-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelPanelComponent } from './FunctionalComponents/FormControls/label-panel/label-panel.component';
import { SwitcherToggleComponent } from './FunctionalComponents/FormControls/switcher-toggle/switcher-toggle.component';
import { ContainerComponent } from './FunctionalComponents/container/container.component';
import { MaterialDesignModule } from '../material/material.module';
import { ButtonSelectionComponent } from './FunctionalComponents/FormControls/button-selection/button-selection.component';

const routes: Routes = [{ path: '', component: DashboardWrapperComponent },];

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        // SharedModule, 
        MaterialDesignModule,
        AngularSplitModule,
        ReactiveFormsModule],
    declarations: [
        DashboardWrapperComponent, 
        DashboardRightSidePanelComponent, 
        DashboardViewComponent, 
        TitleAccordionComponent, 
        InputTextPanelComponent, LabelPanelComponent, SwitcherToggleComponent, ContainerComponent, ButtonSelectionComponent
    ],
    // providers: [StoryActions]
})
export class DashboardFormModule { }
