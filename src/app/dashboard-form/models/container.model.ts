export interface IContainer{
    width?: number;
    height?: number;
    index?: number;
  }
  
  export class Container implements IContainer{
    constructor(
      public width?: number,
      public height?: number,
      public index?: number
    ){}
  }