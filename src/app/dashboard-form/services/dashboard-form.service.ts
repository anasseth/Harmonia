import { EventEmitter, Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { DashboardPageSetting, DashboardPage } from '../models/interfaces';
export interface IDashboard {
    data: any;
    statustype: string;
}
@Injectable({
    providedIn: 'root'
})
export class DashBoardFormService {
    containerPropertyUpdated: any = new Subject();
    onUploadDashboard = new EventEmitter<IDashboard>();
    onAddingContainer = new EventEmitter<IDashboard>();
    // Dashboard Setting
    dashBoardData!:DashboardPage; // this will be binded to Dashboard only specific props reactive form but we don't have that component. it will be binded later
    containerArray: any = []; // this array is already binded to form in dashboard Right panel that collects all conatiner in array here.
    selectedContainerIndex = -1;

    getDashBoardDataId() {
        // Right now, we don't have the component that can be used to add/create dashboard parent level
        // properties. So, assuming we get the data here from the API with dashboard level property and 
        this.dashBoardData = {
            pageID: 0,
            dashboardPageID: 0,
            version: 1,
            name: '',
            nodeName: '',
            siteID: 1,
            entityId: '',
            entityTypeId: 1,
            linkedScale: false,
            linkedLegendWidth: false,
            containerGuidKey: '',
            homePageTemplate: '',
            pageContainers:[],
            dashboardPageSetting:{
                unweightedSampleSize: null,
                effectiveBase: null,
                disableUserReferenceInteraction: null,
                isZoomed: null,
            }
        }
    }

    postDashboardData() {

    }


}

