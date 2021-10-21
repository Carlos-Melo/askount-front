import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-lancamentos',
  templateUrl: './form-lancamentos.component.html',
  styleUrls: ['./form-lancamentos.component.scss']
})
export class FormLancamentosComponent implements OnInit {

  @Input() acao: string = '';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide()
  }

}
