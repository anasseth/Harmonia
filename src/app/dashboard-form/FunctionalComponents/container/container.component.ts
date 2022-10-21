import { Component, Input, OnInit } from '@angular/core';
import { Container } from '../../models/container.model'

@Component({
  selector: 'itl-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() containers: Container[] | undefined;
  constructor() { }

  ngOnInit(): void {
    console.log(this.containers)
  }

}
