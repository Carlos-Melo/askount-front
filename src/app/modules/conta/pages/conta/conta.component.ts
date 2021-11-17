import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Conta } from '../../shared/conta';
import { ContaService } from '../../shared/conta.service';
import { FormContaComponent } from '../form-conta/form-conta.component';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  bsModalRef?: BsModalRef;
  contas: any;
  realContas: any;

  constructor(
    private modalService: BsModalService,
    private contaService: ContaService
    ) { }

  ngOnInit(): void {
    this.listarContas();
  }

  listarContas() {
    this.contaService.listar(1).subscribe( (data: Conta) => {
      this.contas = data;
      this.realContas = data;
      this.trocarNomeBanco();
    },
    error => {
      console.log("Erro", error);
    })
  }

  trocarNomeBanco() {
    for(let i = 0; i < this.contas.length; i++){
      switch(this.contas[i].banco) {
        case 'brasil':
          this.contas[i].banco = 'Banco do Brasil';
          break;
        case 'nordeste':
          this.contas[i].banco = 'Banco do Nordeste';
          break;
        case 'safra':
          this.contas[i].banco = 'Banco Safra';
          break;
        case 'votorantim':
          this.contas[i].banco = 'Banco Votorantim';
          break;
        case 'banrisul':
          this.contas[i].banco = 'Banrisul';
          break;
        case 'bradesco':
          this.contas[i].banco = 'Bradesco';
          break;
        case 'btg':
          this.contas[i].banco = 'BTG Pactual';
          break;
        case 'caixa':
          this.contas[i].banco = 'Caixa Econômica Federal';
          break;
        case 'citibank':
          this.contas[i].banco = 'Citibank Brasil';
          break;
        case 'itau':
          this.contas[i].banco = 'Itaú Unibanco';
          break;
        case 'santander':
          this.contas[i].banco = 'Santander';
          break;
        case 'sicoob':
          this.contas[i].banco = 'Sicoob';
          break;
      }
    }
  }

  openModal(acao: string, id?: number) {
    this.bsModalRef = this.modalService.show(FormContaComponent);
    this.bsModalRef.content.acao = acao;
    this.contaService.emitirEditar.emit(id);
  }

  excluirConta(id: number) {
    this.contaService.delete(id).subscribe( (data: Conta) => {
      alert("Excluído com sucesso");
    },
    error => {
      console.log("Erro", error);
    })
  }

}
