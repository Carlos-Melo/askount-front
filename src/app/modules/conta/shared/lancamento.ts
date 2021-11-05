export interface Lancamento {
  id?: number;
  descricao?: String;
  servico?: String;
  setor?: String;
  dataCompetencia?: String;
  fornecedor?: String;
  valor?: String;
  recebimento?: Boolean;
  totalPagamento?: String;
  totalRecebimento?: String;
  idConta?: number;
}
