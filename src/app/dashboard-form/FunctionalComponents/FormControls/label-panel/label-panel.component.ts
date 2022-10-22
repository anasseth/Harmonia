import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export interface ILabel {
  title: string;
  fieldName: string;
  formGroup: FormGroup;
}
@Component({
  selector: 'itl-label-panel',
  templateUrl: './label-panel.component.html',
  styleUrls: ['./label-panel.component.scss', '../../../styles.scss']
})
export class LabelPanelComponent implements OnInit {
  @Input() settings!: ILabel;
  constructor() { }

  ngOnInit(): void {
    console.log("Label Panel Setting : ", this.settings);
  }

}