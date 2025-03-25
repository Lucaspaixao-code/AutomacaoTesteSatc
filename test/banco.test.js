const Banco = require("../src/banco");

describe("Testes da classe Banco", () => {
    let contaPrincipal;
    let contaSecundaria;

  beforeEach(() => {
    contaPrincipal = new Banco('Lucas',2000);
    contaSecundaria = new Banco('HAHA',2000);
  });

  test("depositar ", async () => {
    expect(contaPrincipal.depositar(2000)).toStrictEqual(4000);
  });
  
  test("sacar ", async () => {
    expect(contaPrincipal.sacar(1500)).toStrictEqual(500);
  });

  test("sacar erro", async () => {
    expect(() => contaPrincipal.sacar(2500)).toThrow();
  });

  test("transferir ", async () => {
    contaPrincipal.transferir(2000, contaSecundaria);

    expect(contaPrincipal.transacoes).toBeDefined();
    expect(contaSecundaria.saldo).toBe(4000);
  });

  test("obter Saldo ", async () => {
    contaPrincipal.depositar(2000);
    contaPrincipal.depositar(3000);
    contaPrincipal.sacar(1500);

    expect(contaPrincipal.obterSaldo()).toEqual(5500);
    
  });

  test("obter Historico ", async () => {
    contaPrincipal.depositar(2000);
    contaPrincipal.depositar(3000);
    contaPrincipal.sacar(1500);

    expect(contaPrincipal.obterHistorico()).toEqual([
                                                      { tipo: 'Depósito', valor: 2000 },
                                                      { tipo: 'Depósito', valor: 3000 },
                                                      { tipo: 'Saque', valor: 1500 }
                                                    ]);
    
  });

  test("Verifica limite saque ", async () => {
    contaPrincipal.depositar(2000);
    contaPrincipal.depositar(3000);
    contaPrincipal.sacar(1500);

    expect(contaPrincipal.obterHistorico()).toEqual([
                                                      { tipo: 'Depósito', valor: 2000 },
                                                      { tipo: 'Depósito', valor: 3000 },
                                                      { tipo: 'Saque', valor: 1500 }
                                                    ]);
    
  });

  test("Definir valor limite saque", async () => {
    contaPrincipal.definirLimiteDeSaque(1000)
    expect(contaPrincipal.limiteDeSaque).toBeDefined();    
  });

  test("Verifica valor limite saque", async () => {
    contaPrincipal.definirLimiteDeSaque(1000)

    expect(contaPrincipal.verificarLimiteDeSaque(500)).toBeTruthy();    
  });

  test("Verifica valor limite saque erro", async () => {
    contaPrincipal.definirLimiteDeSaque(1000)

    expect(() => contaPrincipal.verificarLimiteDeSaque(1500)).toThrow();    
  });

  test("Aplicar taxa", async () => {
    expect(contaPrincipal.aplicarJuros(10)).toEqual(2200);    
  });

  test("Pagar conta", async () => {
    expect(contaPrincipal.pagarConta(1000)).toEqual(1000);    
  });

  test("Total depositado", async () => {
    contaPrincipal.depositar(2000);
    contaPrincipal.depositar(3000);
    contaPrincipal.sacar(1500);

    expect(contaPrincipal.obterTotalDepositado()).toEqual(5000);    
  });
});
