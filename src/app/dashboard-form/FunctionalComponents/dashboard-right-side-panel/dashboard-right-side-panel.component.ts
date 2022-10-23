import { Component, EventEmitter, OnInit, OnChanges, Output, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { DashBoardFormService } from '../../services/dashboard-form.service';
import { selectorData } from '../../BusinessComponents/dashboard-wrapper/sample.data';

@Component({
  selector: 'itl-dashboard-right-side-panel',
  templateUrl: './dashboard-right-side-panel.component.html',
  styleUrls: ['./dashboard-right-side-panel.component.scss', '../../styles.scss']
})
export class DashboardRightSidePanelComponent implements OnInit, OnChanges {
  @Output() onCreateNewContainer = new EventEmitter();
  @Input() selectedIndex!: any;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selector: number = 0;
  selectorName: string = 'Text';
  panelForm!: FormGroup;
  containerSpecControlForm!: FormGroup;
  panelOpenContentState: boolean = false;
  private dashboardFormService: DashBoardFormService;

  constructor(
    private _dashboardFormService: DashBoardFormService,
    public fb: FormBuilder
  ) {
    this.dashboardFormService = _dashboardFormService;
  }

  ngOnInit(): void {
    this.generateForm();
    this.dashboardFormService.onUploadDashboard.subscribe((x) => {
      //this.accordion.closeAll();
    })
    if (this.selectedIndex == -1) {
    }
    else {
      this.containerSpecControlForm.patchValue(
        this.dashboardFormService.containerArray[this.selectedIndex]
      )
      // console.log("Form Updated : ", this.containerSpecControlForm.value);
    }

    this.containerSpecControlForm.valueChanges.subscribe(
      (changes) => {
        console.log("Form Updated : ", JSON.stringify(changes))
        this.dashboardFormService.containerArray[this.selectedIndex] = changes
        console.log(this.dashboardFormService.containerArray)
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Change Detected 1 : ", changes['selectedIndex'].currentValue)
    if (this.selectedIndex != -1) {
      this.containerSpecControlForm.patchValue(
        this.dashboardFormService.containerArray[this.selectedIndex]
      )
    }
  }

  /* Add text container */
  addContainer(selector: any) {
    this.selector = selector;
    this.selectorName = selectorData.filter((x) => x.selectorId == selector)[0].selectorName
    this.onCreateNewContainer.emit(this.containerSpecControlForm.value);
  }

  generateForm() {

    this.containerSpecControlForm = this.fb.group(
      {
        pageID: [0],
        pageContainerID: [0],
        containerIndex:[0],
        name: ['Untitled'],
        pageContainerType: [this.selectorName],
        tag: [''],
        backgroundColor: ['#ffffff'],
        opacity: [0.15],
        containerPosition: this.fb.group(
          {
            top: [0],
            height: [250],
            width: [250],
            left: [0]
          }
        ),
        containerPadding: this.fb.group(
          {
            top: [0],
            bottom: [0],
            right: [0],
            left: [0],
          }
        )
      }
    )

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
