import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export interface ISwitcherToggle{
  title: string;
  labelLeft: string;
  labelRight: string;
  fieldName: string;
  formGroup: FormGroup;
}
@Component({
  selector: 'itl-switcher-toggle',
  templateUrl: './switcher-toggle.component.html',
  styleUrls: ['./switcher-toggle.component.scss', '../../../styles.scss']
})
export class SwitcherToggleComponent implements OnInit {
  @Input() settings!: ISwitcherToggle;
  constructor() { }

  ngOnInit(): void {
    console.log(this.settings)
  }

}
