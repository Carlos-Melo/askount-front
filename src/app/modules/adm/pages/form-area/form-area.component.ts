import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss']
})
export class FormAreaComponent implements OnInit {

  @Input() area: string = '';
  @Input() acao: string = '';
  @Input() areaUpper: string = ''; //Uppercase para exibição

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide()
  }

}
