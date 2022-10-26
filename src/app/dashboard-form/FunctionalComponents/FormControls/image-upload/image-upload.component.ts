import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface IButtonConfig {
  title: string;
  fieldName: string;
  formGroup: FormGroup;
  iconPath?: string;
  actionType?: string | number;
  value?: string | number;
}

@Component({
  selector: 'itl-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() settings!: IButtonConfig;
  constructor() { }

  imageSrc!: string;
  imageHTML: string = 'Test 45';
  imageUploadForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    const reader: any = new FileReader();

    if (event.target.files && event.target.files.length) {
      console.log("Event Target : ", event.target.files)
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.imageUploadForm.patchValue({
          fileSource: reader.result
        });
        this.settings.formGroup.controls[this.settings.fieldName].setValue(this.imageSrc);
      };
    }
  }

  onClickButton() {
    console.log('Performing Action !')
    console.log("Setting Object : ", this.settings)
    // this.settings.formGroup.controls[this.settings.fieldName].setValue(this.imageHTML);
    console.log("Setting Object : ", this.settings)
  }

}
