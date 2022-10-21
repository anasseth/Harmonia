import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export interface IInputText{
  title: string;
  fieldName: string;
  formGroup: FormGroup;
  width: string;
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
    console.log(this.settings)
  }

}
