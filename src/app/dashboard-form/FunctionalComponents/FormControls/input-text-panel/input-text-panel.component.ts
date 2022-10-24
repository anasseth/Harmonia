import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export interface IInputText {
  title: string;
  fieldName: string;
  formGroup: FormGroup | any;
  width: string;
  valueType?: 'Number' | 'String';
}
@Component({
  selector: 'itl-input-text-panel',
  templateUrl: './input-text-panel.component.html',
  styleUrls: ['./input-text-panel.component.scss', '../../../styles.scss']
})
export class InputTextPanelComponent implements OnInit {
  @Input() settings!: IInputText;
  constructor() { }

  ngOnInit(): void {
    console.log("Input Text Panel Setting : ", this.settings);
  }

  changeValue(event: any) {
    console.log(event.target.value)
    this.settings.formGroup.controls[this.settings?.fieldName].setValue(
      this.settings.valueType == 'Number' && event.target.value >= 0 ? Math.abs(Number(event.target.value)) : (this.settings.valueType == 'Number' && event.target.value < 0) ? 0 : event.target.value
    )
  }

}
