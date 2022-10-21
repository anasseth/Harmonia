import {EventEmitter, Injectable} from '@angular/core';
export interface IDashboard{
    data: any;
    statustype: string;
}
@Injectable({
    providedIn: 'root'
})
export class DashBoardFormService {
    onUploadDashboard = new EventEmitter<IDashboard>(); 
    onAddingContainer = new EventEmitter<IDashboard>(); 
}

