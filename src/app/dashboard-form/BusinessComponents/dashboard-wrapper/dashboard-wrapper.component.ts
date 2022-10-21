import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, NgZone, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {DashBoardFormService} from '../../services/dashboard-form.service';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}
@Component({
  selector: 'itl-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss','../../styles.scss']
})
export class DashboardWrapperComponent implements OnInit {
  isNavigatedAway: boolean=true;
  boxArray: any = []

  index = -1;

  x = 50;
  y = 50;
  px = 0;
  py = 0;
  width = 350;
  height = 200;
  draggingCorner = false;
  resizer!: any;
  status!: Status;

  @ViewChild('drawer') matDrawer!: MatDrawer; 
  grid=[1,2,3,4,5,6,7,8,9,10,11,12]
  private dashboardFormService: DashBoardFormService;
  dashboardElement:any;
  statusType: string='load';
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private _dashboardFormService: DashBoardFormService
  ) { 
    this.dashboardFormService=_dashboardFormService;
    router.events.subscribe((val: NavigationEnd | any)=>{
      this.boxArray = []

      if(!val ||!val.url) this.isNavigatedAway=true;
      // if(val.url.includes('menuBar')){
      //   this.isNavigatedAway=true;  
      // }else{
        this.isNavigatedAway=false;
      // }
    })
  }

  ngOnInit(): void {
    this.dashboardFormService.onUploadDashboard.subscribe((x)=>{
      this.dashboardElement=x.data;
      this.statusType=x.statustype;
      if(this.statusType==='load')this.matDrawer.close()
    })
  }

  toggleDrawer(){
    this.matDrawer.toggle();
    this.statusType=this.matDrawer.opened?'new':'load';
    console.log(this.matDrawer.opened);
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.boxArray[this.index].x += offsetX;
    this.boxArray[this.index].y += offsetY;
    this.boxArray[this.index].width -= offsetX;
    this.boxArray[this.index].height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.boxArray[this.index].y += offsetY;
    this.boxArray[this.index].width += offsetX;
    this.boxArray[this.index].height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.boxArray[this.index].x += offsetX;
    this.boxArray[this.index].width -= offsetX;
    this.boxArray[this.index].height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.boxArray[this.index].width += offsetX;
    this.boxArray[this.index].height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function, index?: any) {
    console.log(index)
    this.index = index ? index : -1;
    this.draggingCorner = true;
    this.boxArray[this.index].px = event.clientX;
    this.boxArray[this.index].py = event.clientY;
    this.resizer = resizer;
    this.status = 1;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener("document:mousemove", ["$event"])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
      return;
    }

    let offsetX = event.clientX - this.boxArray[this.index].px;
    let offsetY = event.clientY - this.boxArray[this.index].py;

    if (this.status === Status.RESIZE) this.resizer(offsetX, offsetY);
    else if (this.status === Status.MOVE) this.onDrag(offsetX, offsetY, this.index);
    this.boxArray[this.index].px = event.clientX;
    this.boxArray[this.index].py = event.clientY;
  }

  @HostListener("document:mouseup", ["$event"])
  onCornerRelease(event: MouseEvent) {
    this.draggingCorner = false;
  }

  setStatus(event: MouseEvent, status: number, func: any, index: any) {
    this.index = index ? index : 0;

    if (status === 1) {
      this.draggingCorner = true;
      this.boxArray[this.index].px = event.clientX;
      this.boxArray[this.index].py = event.clientY;
      this.resizer = func;
      this.status = 1;
      event.preventDefault();
      event.stopPropagation();
    } else if (status === 2) {
      this.draggingCorner = true;
      this.boxArray[this.index].px = event.clientX;
      this.boxArray[this.index].py = event.clientY;
      this.status = 2;
    }
  }

  onDrag(x: any, y: any, index: any) {
    this.boxArray[index].x = this.boxArray[index].x + x;
    this.boxArray[index].y = this.boxArray[index].y + y;
  }

  createNewContainer() {
    var obj = {
      x: 50,
      y: 150,
      px: 0,
      py: 0,
      width: 150,
      height: 70,
    }
    this.boxArray.push(obj)
  }
}
