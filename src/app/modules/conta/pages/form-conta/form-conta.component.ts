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

  @Input() acao: string = '';

  formulario: FormGroup;
  conta: Conta;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private contaService: ContaService
    ) { }

  ngOnInit(): void {
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

  enviaCadastro() {
    this.contaService.cadastrar(this.conta).subscribe( (data: Conta) => {
      alert("Cadastrado com sucesso");
      this.onClose();
    },
    error => {
      console.log("Erro", error);
    })
  }

  setarDados() {
    this.conta = {
      descricao: this.formulario.controls.descricao.value,
      banco: this.formulario.controls.banco.value,
      tipoBanco: this.formulario.controls.tipoBanco.value,
      valorInicial: this.formulario.controls.valorInicial.value,
      idUsuario: 1
    }

    this.enviaCadastro();
  }

  onClose(){
    this.bsModalRef.hide()
  }

  /**** Formata para moeda brasileira*/
  converteBrl(value) {
    let real = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log(real)
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
