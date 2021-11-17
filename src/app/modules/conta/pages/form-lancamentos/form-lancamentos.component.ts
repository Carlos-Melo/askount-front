import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Conta } from '../../shared/conta';
import { ContaService } from '../../shared/conta.service';
import { Lancamento } from '../../shared/lancamento';
import { LancamentoService } from '../../shared/lancamento.service';

@Component({
  selector: 'app-form-lancamentos',
  templateUrl: './form-lancamentos.component.html',
  styleUrls: ['./form-lancamentos.component.scss']
})
export class FormLancamentosComponent implements OnInit {

  @Input() acao: string = '';
  @Input() pagOuRec: string = '';

  formulario: FormGroup;
  lancamento: Lancamento;
  contas: any;
  banco: String;
  recebimento: Boolean;
  valorForm: String;
  lancamentoId: number;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentoService,
    private contaService: ContaService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.lancamentoService.emitirEditar.subscribe((id: number)=> {
      this.getOne(id)
    })

    this.inicializaForm();

    this.listarContas();

  }

  inicializaForm() {
    this.formulario = this.formBuilder.group({
      descricao: ['', Validators.required],
      servico: [''],
      setor: [''],
      dataCompetencia: ['', Validators.required],
      conta: ['', Validators.required],
      fornecedor: [''],
      cliente: [''],
      valor: ['', Validators.required],
      arquivo: ['']
    })
  }

  onSubmit() {
    if(this.formulario.valid) {
      this.setarDados();
    }else {
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      })
    }
  }

  /*** Envia dados para cadastro ***/
  enviaCadastro() {
    this.lancamentoService.cadastrar(this.lancamento).subscribe( (data: Lancamento) => {
      alert("Cadastrado com sucesso");
      this.onClose();
    },
    error => {
      console.log("Erro", error);
    })
  }

  listarContas() {
    this.contaService.listar(1).subscribe( (data: Conta) => {
      this.contas = data;
      this.trocarNomeBanco();
    },
    error => {
      console.log("Erro", error);
    })
  }

  /*** Envia dados para edição ***/
  enviaDadosEditados() {
    this.lancamentoService.editar(this.lancamento.id, this.lancamento).subscribe((data) =>{
      alert('Dados alterados comsucesso');
      this.onClose();
    }),
    error => {
      console.log('Error', error);
    }
  }

  setarDados() {
    if(this.pagOuRec === 'Recebimento'){
      this.recebimento = true;
    }else{
      this.recebimento = false;
    }
    if(this.lancamentoId != undefined){
      this.lancamento = {
        id: this.lancamento.id,
        descricao: this.formulario.controls.descricao.value,
        servico: this.formulario.controls.servico.value,
        setor: this.formulario.controls.setor.value,
        dataCompetencia: this.formulario.controls.dataCompetencia.value,
        fornecedor: this.formulario.controls.fornecedor.value,
        valor: this.formulario.controls.valor.value,
        recebimento: this.recebimento,
        idConta: this.formulario.controls.conta.value
      }

      this.enviaDadosEditados();

    }else {
      this.lancamento = {
        descricao: this.formulario.controls.descricao.value,
        servico: this.formulario.controls.servico.value,
        setor: this.formulario.controls.setor.value,
        dataCompetencia: this.formulario.controls.dataCompetencia.value,
        fornecedor: this.formulario.controls.fornecedor.value,
        valor: this.formulario.controls.valor.value,
        recebimento: this.recebimento,
        idConta: this.formulario.controls.conta.value
      }
      this.enviaCadastro()
    }

  }

  getOne(id: number) {
    this.lancamentoId = id;
    if(this.lancamentoId != undefined){
      this.lancamentoService.getOne(id).subscribe( (data: Lancamento) => {
        this.setarEditDados(data);
      },
      error => {
        console.log(error)
      })
    }
  }


  setarEditDados(data: Lancamento) {
    let idConta = this.router.routerState.snapshot.url[7]; //Deixar mais dinamico
    this.lancamento = data;
    this.formulario.controls.descricao.setValue(this.lancamento.descricao)
    this.formulario.controls.servico.setValue(this.lancamento.servico)
    this.formulario.controls.setor.setValue(this.lancamento.setor)
    this.formulario.controls.dataCompetencia.setValue(this.lancamento.dataCompetencia)
    this.formulario.controls.fornecedor.setValue(this.lancamento.fornecedor)
    this.formulario.controls.valor.setValue(this.lancamento.valor)
    this.formulario.controls.conta.setValue(idConta)
  }

  trocarNomeBanco() {
    for(let i = 0; i < this.contas.length; i++){
      switch(this.contas[i].banco) {
        case 'brasil':
          this.banco = 'Banco do Brasil';
          break;
        case 'nordeste':
          this.banco = 'Banco do Nordeste';
          break;
        case 'safra':
          this.banco = 'Banco Safra';
          break;
        case 'votorantim':
          this.banco = 'Banco Votorantim';
          break;
        case 'banrisul':
          this.banco = 'Banrisul';
          break;
        case 'bradesco':
          this.banco = 'Bradesco';
          break;
        case 'btg':
          this.banco = 'BTG Pactual';
          break;
        case 'caixa':
          this.banco = 'Caixa Econômica Federal';
          break;
        case 'citibank':
          this.banco = 'Citibank Brasil';
          break;
        case 'itau':
          this.banco = 'Itaú Unibanco';
          break;
        case 'santander':
          this.banco = 'Santander';
          break;
        case 'sicoob':
          this.banco = 'Sicoob';
          break;
      }
    }
  }

  /**** Formata para moeda brasileira*/
  converteBrl(value) {
    if(value.search(',') < 0 && value != ''){
      this.valorForm = parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }else {
      this.valorForm = value;
    }
  }

  onClose(){
    this.bsModalRef.hide()
  }

  /*** Verifica e retorna campo touched inválido ***/
  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  /*** Aplica a classe Bootstrap para campos inválidos ***/
  aplicaCssErro(campo) {
    return{
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

}
