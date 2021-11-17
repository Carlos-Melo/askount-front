import { Component, OnInit } from '@angular/core';
import { Conta } from 'src/app/modules/conta/shared/conta';
import { ContaService } from 'src/app/modules/conta/shared/conta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  contas: any;
  srcImagem: String;

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.getContas();
  }

  /*** Retorna a lista de todas as contas ***/
  getContas() {
    this.contaService.listar(1).subscribe( (data: Conta) => {
      this.contas = data;
    }, error => {
      console.log("Erro", error)
    })
  }
}
