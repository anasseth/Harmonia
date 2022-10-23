import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, NgZone, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DashBoardFormService } from '../../services/dashboard-form.service';
import { NavigationEnd, Router } from '@angular/router';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}
@Component({
  selector: 'itl-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss', '../../styles.scss']
})
export class DashboardWrapperComponent implements OnInit {
  isNavigatedAway: boolean = true;
  boxArray: any = []
  a:number=30;

  index = -1;
  selectedIndex = -1;

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
  grid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  dashboardElement: any;
  statusType: string = 'load';
  constructor(
    private router: Router,
    private ngZone: NgZone,
    public dashboardFormService: DashBoardFormService
  ) {
    router.events.subscribe((val: NavigationEnd | any) => {
      this.dashboardFormService.containerArray = []
      if (!val || !val.url) this.isNavigatedAway = true;
      this.isNavigatedAway = false;
    })
  }

  ngOnInit(): void {
    this.dashboardFormService.onUploadDashboard.subscribe((x) => {
      this.dashboardElement = x.data;
      this.statusType = x.statustype;
      if (this.statusType === 'load') this.matDrawer.close()
    })
  }

  toggleDrawer() {
    this.matDrawer.toggle();
    this.statusType = this.matDrawer.opened ? 'new' : 'load';
    console.log(this.matDrawer.opened);
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.dashboardFormService.containerArray[this.index].containerPosition.left += offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.top += offsetY;
    this.dashboardFormService.containerArray[this.index].containerPosition.width -= offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.dashboardFormService.containerArray[this.index].containerPosition.top += offsetY;
    this.dashboardFormService.containerArray[this.index].containerPosition.width += offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.dashboardFormService.containerArray[this.index].containerPosition.left += offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.width -= offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.dashboardFormService.containerArray[this.index].containerPosition.width += offsetX;
    this.dashboardFormService.containerArray[this.index].containerPosition.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function, index?: any) {
    console.log(index)
    this.index = index ? index : -1;
    // console.log("On Corner Click")
    this.draggingCorner = true;
    this.dashboardFormService.containerArray[this.index].containerPosition.px = event.clientX;
    this.dashboardFormService.containerArray[this.index].containerPosition.py = event.clientY;
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

    let offsetX = event.clientX - this.dashboardFormService.containerArray[this.index].containerPosition.px;
    let offsetY = event.clientY - this.dashboardFormService.containerArray[this.index].containerPosition.py;

    if (this.status === Status.RESIZE) this.resizer(offsetX, offsetY);
    else if (this.status === Status.MOVE) this.onDrag(offsetX, offsetY, this.index);
    this.dashboardFormService.containerArray[this.index].containerPosition.px = event.clientX;
    this.dashboardFormService.containerArray[this.index].containerPosition.py = event.clientY;
  }

  @HostListener("document:mouseup", ["$event"])
  onCornerRelease(event: MouseEvent) {
    this.draggingCorner = false;
  }

  setStatus(event: MouseEvent, status: number, func: any, index: any) {
    this.index = index ? index : 0;
    // console.log("On Set Status")

    if (status === 1) {
      this.draggingCorner = true;
      this.dashboardFormService.containerArray[this.index].containerPosition.px = event.clientX;
      this.dashboardFormService.containerArray[this.index].containerPosition.py = event.clientY;
      this.resizer = func;
      this.status = 1;
      event.preventDefault();
      event.stopPropagation();
    } else if (status === 2) {
      this.draggingCorner = true;
      this.dashboardFormService.containerArray[this.index].containerPosition.px = event.clientX;
      this.dashboardFormService.containerArray[this.index].containerPosition.py = event.clientY;
      this.status = 2;
    }
  }

  onDrag(x: any, y: any, index: any) {
    this.dashboardFormService.containerArray[index].containerPosition.left = (this.dashboardFormService.containerArray[index].containerPosition.left + x) < 0 ? 0 : (this.dashboardFormService.containerArray[index].containerPosition.left + x);
    this.dashboardFormService.containerArray[index].containerPosition.top = (this.dashboardFormService.containerArray[index].containerPosition.top + y) < 0 ? 0 : (this.dashboardFormService.containerArray[index].containerPosition.top + y);
  }

  createNewContainer(event: any) {

    var newContainerSpec = {
      pageID: 0,
      pageContainerID: 0,
      containerIndex: this.dashboardFormService.containerArray.length,
      name: "Untitled",
      pageContainerType: "Text",
      tag: "",
      backgroundColor: '#ffffff',
      opacity: 0.15,
      containerPosition: {
        top: 0,
        left: 0,
        px: 0,
        py: 0,
        height: 250,
        width: 250,
      },
      containerPadding: {
        top: 10,
        bottom: 20,
        right: 30,
        left: 40
      }
    }

    this.dashboardFormService.containerArray.push(newContainerSpec);
    console.log("Container Array : ", this.dashboardFormService.containerArray);
  }

  activateContainer(index: any) {
    console.log("On Click Container !")
    this.dashboardFormService.selectedContainerIndex = index;
    this.selectedIndex = index;
  }
}
