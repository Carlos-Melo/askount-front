import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-conta',
  templateUrl: './form-conta.component.html',
  styleUrls: ['./form-conta.component.scss']
})
export class FormContaComponent implements OnInit {

  @Input() acao: string = '';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide()
  }

}
