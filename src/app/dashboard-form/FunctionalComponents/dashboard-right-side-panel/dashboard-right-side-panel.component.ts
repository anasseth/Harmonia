import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { DashBoardFormService } from '../../services/dashboard-form.service';

@Component({
  selector: 'itl-dashboard-right-side-panel',
  templateUrl: './dashboard-right-side-panel.component.html',
  styleUrls: ['./dashboard-right-side-panel.component.scss', '../../styles.scss']
})
export class DashboardRightSidePanelComponent implements OnInit {
  @Output() onCreateNewContainer = new EventEmitter();
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selector: number = 0;
  panelForm!: FormGroup;
  panelOpenContentState: boolean = false;
  private dashboardFormService: DashBoardFormService;

  constructor(
    private _dashboardFormService: DashBoardFormService,
  ) {
    this.dashboardFormService = _dashboardFormService;
  }

  ngOnInit(): void {
    this.generateForm();
    this.dashboardFormService.onUploadDashboard.subscribe((x) => {
      //this.accordion.closeAll();
    })
  }

  /* Add text container */
  addContainer(selector: any) {
    this.selector = selector;
    this.onCreateNewContainer.emit();
  }

  generateForm() {

   /*  SEE MY COMMENTS
    this.panelForm = new FormGroup({
      entityId: new FormControl(dashboardData.EntityId, Validators.required),
      entityTypeId: new FormControl(dashboardData.EntityTypeId, Validators.required),
      name: new FormControl(dashboardData.Name, Validators.required), */
      /* Here start creating an array of containers. It is one form. You have to add a type field, i.e. type=text, type=image */
      /* If it is a common property -> Validation required. If not then no validation */
      /* Currently let's add all the mandatory fields */


    this.panelForm = new FormGroup({
      nameText: new FormControl('untitled'),
      typeText: new FormControl('Text'),
      widthText: new FormControl(30),
      heightText: new FormControl(30),
      xFromLeftText: new FormControl(45),
      yFromTopText: new FormControl(45),
      isDispalySizeLockedText: new FormControl('off'),
      backGroundColourText: new FormControl(''),
      backGroundColourPercentageText: new FormControl(),
      topText: new FormControl(),
      rightText: new FormControl(),
      bottomText: new FormControl(),
      leftText: new FormControl(),
      customLinkText: new FormControl(),
      projectNameText: new FormControl(),
      nameImage: new FormControl(''),
      typeImage: new FormControl(''),
      sourceImage: new FormControl(''),
      centreImage: new FormControl(''),
      fullImage: new FormControl(''),
      stretchImage: new FormControl(''),
      anchorImage: new FormControl(''),
      widthImage: new FormControl(''),
      heightImage: new FormControl(''),
      xFromLeftImage: new FormControl(''),
      yFromTopImage: new FormControl(''),
      backGroundColourImage: new FormControl(''),
      backGroundColourPercentageImage: new FormControl(),
      sendToFrontImage: new FormControl(),
      bringForwardImage: new FormControl(),
      sendBackwordImage: new FormControl(),
      sendToLinkImage: new FormControl(),
      topImage: new FormControl(),
      rightImage: new FormControl(),
      bottomImage: new FormControl(),
      leftImage: new FormControl(),
      customLinkImage: new FormControl(),
      projectNameImage: new FormControl(),
    });
  }

}
