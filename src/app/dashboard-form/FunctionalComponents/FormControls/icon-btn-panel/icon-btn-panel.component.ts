import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface IIconBtnConfig {
  title: string;
  fieldName: string;
  formGroup: FormGroup;
  option: OptionConfig[];
}

export interface OptionConfig {
  btnText: string;
  iconName: string;
  value: string;
}

@Component({
  selector: 'itl-icon-btn-panel',
  templateUrl: './icon-btn-panel.component.html',
  styleUrls: ['./icon-btn-panel.component.scss']
})
export class IconBtnPanelComponent implements OnInit {
  @Input() settings!: IIconBtnConfig;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(params: any) {
    this.settings.formGroup.controls[this.settings.fieldName].setValue(params);
  }

}
