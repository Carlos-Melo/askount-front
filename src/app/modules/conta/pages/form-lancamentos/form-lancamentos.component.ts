import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form-lancamentos',
  templateUrl: './form-lancamentos.component.html',
  styleUrls: ['./form-lancamentos.component.scss']
})
export class FormLancamentosComponent implements OnInit {

  @Input() acao: string = '';
  @Input() pagOuRec: string = '';

  formulario: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.inicializaForm();

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
