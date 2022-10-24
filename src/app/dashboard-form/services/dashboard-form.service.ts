import {EventEmitter, Injectable} from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
export interface IDashboard{
    data: any;
    statustype: string;
}
@Injectable({
    providedIn: 'root'
})
export class DashBoardFormService {
    containerPropertyUpdated:any = new Subject();
    onUploadDashboard = new EventEmitter<IDashboard>(); 
    onAddingContainer = new EventEmitter<IDashboard>(); 
    //
    containerArray:any = []
    selectedContainerIndex = -1;
    dashBoardData = {}

    getDashBoardData(){

    }
}

