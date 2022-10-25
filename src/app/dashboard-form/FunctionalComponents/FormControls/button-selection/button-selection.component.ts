import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface IButtonConfig {
  title: string;
  fieldName: string;
  formGroup: FormGroup;
  iconPath?: string;
  actionType?: string | number;
  value?: string | number;
}

@Component({
  selector: 'itl-button-selection',
  templateUrl: './button-selection.component.html',
  styleUrls: ['./button-selection.component.scss']
})

export class ButtonSelectionComponent implements OnInit {
  @Input() settings!: IButtonConfig;
  constructor() { }

  ngOnInit(): void {
  }

  onClickButton() {
    console.log('Performing Action !')
    switch (this.settings.actionType) {
      case 'max':
        this.settings.formGroup.controls[this.settings.fieldName].setValue(this.settings.value);
        break;
      case 'min':
        this.settings.formGroup.controls[this.settings.fieldName].setValue(this.settings.value);
        break;
      case 'decrement':
        if(this.settings.formGroup.get(this.settings.fieldName)?.value > 2){
          this.settings.formGroup.controls[this.settings.fieldName].setValue(this.settings.formGroup.get(this.settings.fieldName)?.value - 1);
        }
        break;
      case 'increment':
        this.settings.formGroup.controls[this.settings.fieldName].setValue(this.settings.formGroup.get(this.settings.fieldName)?.value + 1);
        break;
      default:
        break;
    }
    console.log("zIndex Value : ",this.settings.formGroup.controls[this.settings.fieldName].value)
  }
}
