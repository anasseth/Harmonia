import { Component, EventEmitter, OnInit, OnChanges, Output, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  public dashboardFormService: DashBoardFormService;

  constructor(
    public _dashboardFormService: DashBoardFormService,
    public fb: FormBuilder
  ) {
    this.dashboardFormService = _dashboardFormService;
  }

  ngOnInit(): void {
    this.generateForm();
    this.dashboardFormService.onUploadDashboard.subscribe((x) => {
    })
    if (this.selectedIndex == -1) {
    }
    else {
      this.containerSpecControlForm.patchValue(
        this.dashboardFormService.containerArray[this.selectedIndex]
      )
    }

    this.containerSpecControlForm.valueChanges.subscribe(
      (changes) => {
        if (this.selectedIndex != -1) {
          this.dashboardFormService.containerArray[this.selectedIndex] = changes
          // console.log(this.dashboardFormService.containerArray)
        }
      }
    )
    this.dashboardFormService.containerPropertyUpdated.subscribe(
      (res: boolean) => {
        if (this.selectedIndex != -1) {
          this.containerSpecControlForm.patchValue(
            this.dashboardFormService.containerArray[this.selectedIndex]
          )
        }
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
    this.selectorName = selectorData.filter((x) => x.selectorId == selector)[0].selectorName;
    this.containerSpecControlForm.controls['pageContainerType'].setValue(this.selectorName);
    this.onCreateNewContainer.emit(this.selectorName);
  }

  generateForm() {
    this.containerSpecControlForm = this.fb.group(
      {
        pageID: [0, Validators.required],
        pageContainerID: [0, Validators.required],
        containerIndex: [0, Validators.required],
        name: ['Untitled', Validators.required],
        pageContainerType: [this.selectorName, Validators.required],
        tag: ['', Validators.required],
        zoomable: [false, Validators.required],
        isZoomed: [false, Validators.required],
        analysisId: [0, Validators.required],
        backgroundColor: ['#ffffff', Validators.required],
        opacity: [0.15, Validators.required],
        zIndex: [1, Validators.required],
        containerPosition: this.fb.group(
          {
            top: [0, Validators.required],
            height: [250, Validators.required],
            width: [250, Validators.required],
            left: [0, Validators.required]
          }
        ),
        containerPadding: this.fb.group(
          {
            top: [0, Validators.required],
            bottom: [0, Validators.required],
            right: [0, Validators.required],
            left: [0, Validators.required],
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
