import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Conta } from '../../shared/conta';
import { ContaService } from '../../shared/conta.service';

@Component({
  selector: 'app-form-conta',
  templateUrl: './form-conta.component.html',
  styleUrls: ['./form-conta.component.scss']
})
export class FormContaComponent implements OnInit {

  @Input() acao: String = '';

  formulario: FormGroup;
  conta: Conta;
  contaId: number;
  valorForm: String;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private contaService: ContaService
    ) { }

  ngOnInit(): void {
    this.contaService.emitirEditar.subscribe((id: number) => {
      this.getConta(id);
    })

    this.inicializaForm();
  }

  inicializaForm() {
      this.formulario = this.formBuilder.group({
        descricao: [''],
        banco: ['', Validators.required],
        tipoBanco: ['', Validators.required],
        valorInicial: ['', Validators.required]
      })
  }

  /*** Verifica se o formulário é válido e manda setar os dados ***/
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
    this.contaService.cadastrar(this.conta).subscribe( (data: Conta) => {
      alert("Cadastrado com sucesso");
      this.onClose();
    },
    error => {
      console.log("Erro", error);
    })
  }

  /*** Captura conta para editar ***/
  getConta(id) {
    this.contaId = id
    if(id != undefined){
    this.contaService.getOne(id).subscribe( (data: Conta) => {
      this.setarEditDados(data);
    },
    error => {
      console.log("Erro", error);
    })
    }
  }

  /*** Envia dados para edição ***/
  enviaDadosEditados() {
    this.contaService.editar(this.conta.id, this.conta).subscribe((data) =>{
      alert('Dados alterados comsucesso');
      this.onClose();
    }),
    error => {
      console.log('Error', error);
    }
  }

  /*** Seta os dados do back para formulario ***/
  setarEditDados(conta: Conta) {
    this.conta = conta
    this.formulario.controls.descricao.setValue(this.conta.descricao)
    this.formulario.controls.banco.setValue(this.conta.banco)
    this.formulario.controls.tipoBanco.setValue(this.conta.tipoBanco)
    this.formulario.controls.valorInicial.setValue(this.conta.valorInicial)

  }

  /*** Seta os dados do formulário para Conta ***/
  setarDados() {
    if(this.contaId != undefined){
      console.log("Editar")
      this.conta = {
        id: this.conta.id,
        descricao: this.formulario.controls.descricao.value,
        banco: this.formulario.controls.banco.value,
        tipoBanco: this.formulario.controls.tipoBanco.value,
        valorInicial: this.formulario.controls.valorInicial.value,
        idUsuario: 1
      }

      this.enviaDadosEditados();

    }else {
      console.log("Undefined")
      this.conta = {
        descricao: this.formulario.controls.descricao.value,
        banco: this.formulario.controls.banco.value,
        tipoBanco: this.formulario.controls.tipoBanco.value,
        valorInicial: this.formulario.controls.valorInicial.value,
        idUsuario: 1
      }

      this.enviaCadastro();
    }

  }

  onClose(){
    this.bsModalRef.hide()
  }

  /**** Formata para moeda brasileira*/
  converteBrl(value) {
    if(value.search(',') < 0 && value != ''){
      this.valorForm = parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }else {
      this.valorForm = value;
    }
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
