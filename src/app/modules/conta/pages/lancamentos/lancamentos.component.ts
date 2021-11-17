import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Conta } from '../../shared/conta';
import { ContaService } from '../../shared/conta.service';
import { Lancamento } from '../../shared/lancamento';
import { LancamentoService } from '../../shared/lancamento.service';
import { FormLancamentosComponent } from '../form-lancamentos/form-lancamentos.component';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit {

  bsModalRef?: BsModalRef;
  data: Date = new Date();
  meses: Array<String> = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  dataAtual: String;
  isActive: boolean = true;
  idConta: number;
  srcImagem: String;
  pagLanc: String = "Pagamento";
  lancamentos: any;
  totalLancamento: number;

  constructor(
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private contaService: ContaService,
    private lancamentoService: LancamentoService
    ) { }

  ngOnInit(): void {
    this.dataAtual = `${this.meses[this.data.getMonth()]} / ${this.data.getFullYear()}`;
    this.listaLancamentos();


    this.identConta();
  }

  /**** Listar Lançamentos ****/
  listaLancamentos() {
    this.lancamentoService.listar(this.idConta).subscribe( (data: Lancamento) => {
      this.lancamentos = data;
      this.somaValoresLancamentos();
    },
    error => {
      console.log("Erro", error);
    })
  }

  somaValoresLancamentos() {
    for(let i = 0; i < this.lancamentos.length; i++) {
      console.log(this.lancamentos[i].valor)
    }
  }

  /**** Pega imagem dos arquivos e retorna para HTML ****/
  setaImagem(banco) {
    this.srcImagem = `../../../../../assets/img/bancos/${banco}.png`;
  }

  /***** Relaciona id com conta ******/
  identConta(){
    this.idConta = this.activatedRoute.snapshot.params['id'];
    console.log(this.activatedRoute.snapshot)

    this.contaService.getOne(this.idConta).subscribe( (data: Conta) => {
      this.setaImagem(data.banco);
    }, error => {
      console.log("Erro", error)
    })
  }

  /******* Chamada para o formulário *********/
  openModal(acao: string, id?: number) {
    this.bsModalRef = this.modalService.show(FormLancamentosComponent, {class: 'modal-lg' });
    this.bsModalRef.content.acao = acao;
    this.bsModalRef.content.pagOuRec = this.pagLanc;
    this.lancamentoService.emitirEditar.emit(id);
  }

  /******* Atualiza data para próximo mes e ano *********/
  proxMes() {
    this.data.setMonth(this.data.getMonth() + 1);
    this.dataAtual = `${this.meses[this.data.getMonth()]} / ${this.data.getFullYear()}`;
  }

  /******* Atualiza data para anterior mes e ano *********/
  antMes() {
    this.data.setMonth(this.data.getMonth() - 1);
    this.dataAtual = `${this.meses[this.data.getMonth()]} / ${this.data.getFullYear()}`;
  }

  /******* Adiciona classe "active" no pagamento *********/
  pActivated() {
    this.isActive = true;
    this.pagLanc = "Pagamento";
  }

  /******* Adiciona classe "active" no recebimento *********/
  rActivated() {
    this.isActive = false;
    this.pagLanc = "Recebimento";
  }



}
