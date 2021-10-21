import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormAreaComponent } from '../form-area/form-area.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  bsModalRef?: BsModalRef;
  area: string = '';
  areaUpper: string = ''; //Adicionando uppercase para exibição

  constructor(private modalService: BsModalService, private rota: ActivatedRoute) { }

  ngOnInit(): void {
    this.rota.params.subscribe(params => {
      this.area = params['area'];
    })

    if(this.area === 'servico'){
      this.area = this.area.replace('c', 'ç')
    }

    this.areaUpper = this.area[0].toUpperCase() + this.area.substr(1);

  }

  openModal(acao: string) {
    this.bsModalRef = this.modalService.show(FormAreaComponent);
    this.bsModalRef.content.area = this.area;
    this.bsModalRef.content.acao = acao;
    this.bsModalRef.content.areaUpper = this.areaUpper;
  }

}
