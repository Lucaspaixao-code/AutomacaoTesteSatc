const AnaliseDeDados  = require("../src/analiseDeDados");

describe("Classe analise de dados", () => {
  let analiseDados;
  let analiseDados2;
  
  beforeEach(() => {
    analiseDados = new AnaliseDeDados([10,45]); 
    analiseDados2 = new AnaliseDeDados(); 
  });

  test("Adicionar dados corretamente", async () => {
    analiseDados.adicionarDados([40]);

    expect(analiseDados.dados).toStrictEqual([10,45,40]);
  });

  test("Adicionar dados que não são array", async () => {
    expect(() => analiseDados.adicionarDados(10)).toThrow();    
  });

  test("limpar os dados do array", async () => {
    analiseDados.limparDados();

    expect(analiseDados.dados).toStrictEqual([]);
  });

  test("Ordenar corretamente os dados dentro do array", async () => {
    analiseDados.adicionarDados([40]);

    expect(analiseDados.ordenarDados()).toStrictEqual([10,40,45]);
  });

  test("calcula media dos numeros dentro do array", async () => {
    expect(analiseDados.calcularMedia()).toStrictEqual(27.5);
  });

  test("calcula media dos numeros dentro do array - return null", async () => {
    expect(analiseDados2.calcularMedia()).toBeNull();
  });

  test("retorna a mediana do array", async () => {
    analiseDados.adicionarDados([40]);

    expect(analiseDados.calcularMediana()).toStrictEqual(40);
  });

  test("retorna a mediana do array - return null", async () => {
    expect(analiseDados2.calcularMediana()).toBeNull();
  });

  test("retorna a mediana do array - array par", async () => {
    expect(analiseDados.calcularMediana()).toStrictEqual(27.5);
  });

  test("Calcular a moda do array", async () => {
    analiseDados.adicionarDados([10]);

    expect(analiseDados.calcularModa()).toStrictEqual([10]);
  });

  test("Calcular a moda do array - return null", async () => {
    expect(analiseDados2.calcularModa()).toBeNull();
  });

  test("Calcular a variancia do array", async () => {
    analiseDados.adicionarDados([10]);

    expect(analiseDados.calcularVariancia()).toStrictEqual(272.2222222222222);
  });

  test("Calcular a variancia do array - return null", async () => {
    expect(analiseDados2.calcularVariancia()).toBeNull();
  });

  test("Calcular o desvio padrão do array", async () => {
    analiseDados.adicionarDados([10]);

    expect(analiseDados.calcularDesvioPadrao()).toStrictEqual(16.499158227686106);
  });

  test("Calcular o desvio padrão do array - return null", async () => {
    expect(analiseDados2.calcularDesvioPadrao()).toBeNull();
  });

  test("Encontrar o menor valor dentro do array", async () => {
    analiseDados.adicionarDados([1]);

    expect(analiseDados.encontrarMinimo()).toStrictEqual(1);
  });

  test("Encontrar o menor valor dentro do array - return null", async () => {
    expect(analiseDados2.encontrarMinimo()).toBeNull();
  });

  test("Encontrar o maior valor dentro do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.encontrarMaximo()).toStrictEqual(100);
  });

  test("Encontrar o maior valor dentro do array - return null", async () => {
    expect(analiseDados2.encontrarMaximo()).toBeNull();
  });

  test("Normaliza os dados dentro do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.normalizarDados()).toStrictEqual([0.09090909090909091, 0.4444444444444444, 0, 1]);
  });

  test("Normaliza os dados dentro do array - mesmo valor", async () => {
    analiseDados2.adicionarDados([1]);
    analiseDados2.adicionarDados([1]);

    expect(analiseDados2.normalizarDados()).toStrictEqual([0,0]);
  });

  test("Calcula o percentil do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.calcularPercentil(5)).toStrictEqual(2.35);
  });

  test("Calcula o percentil do array - return null", async () => {
    expect(analiseDados2.calcularPercentil(5)).toBeNull();
  });

  test("Calcula a soma do dados dentro do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.calcularSoma()).toStrictEqual(156);
  });

  test("Calcula o produto do dados dentro do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.calcularProduto()).toStrictEqual(45000);
  });

  test("Calcula a amplitude do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.calcularAmplitude()).toStrictEqual(99);
  });
  
  test("Calcula o coeficiente de variação do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    expect(analiseDados.calcularCoeficienteVariacao()).toStrictEqual(99.65423457850655);
  });

  test("Calcula o coeficiente de variação do array - return null", async () => {
    analiseDados2.adicionarDados([0]);
    expect(analiseDados2.calcularCoeficienteVariacao()).toBeNull();
  });

  test("Calcula os outliers do array", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    analiseDados.adicionarDados([1000]);
    analiseDados.removerOutliers();
    expect(analiseDados.dados).toStrictEqual([10, 45, 1, 100]);
  });

  test("Calcula os outliers do array com parametro", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    analiseDados.adicionarDados([1000]);
    analiseDados.removerOutliers(2);
    expect(analiseDados.dados).toStrictEqual([10, 45, 1, 100]);
  });

  test("Calcula a correlaação de dois arrys - return null", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    analiseDados.adicionarDados([1000]);
    analiseDados.removerOutliers();

    var outroConjunto = [10,20,30]; 

    expect(analiseDados.calcularCorrelacao(outroConjunto)).toBeNull();
  });

  test("Calcula a correlação de dois arrys", async () => {
    analiseDados.adicionarDados([1]);
    analiseDados.adicionarDados([100]);

    analiseDados.adicionarDados([1000]);
    analiseDados.removerOutliers();

    var outroConjunto = [10,20,30,40]; 

    expect(analiseDados.calcularCorrelacao(outroConjunto)).toBe(0.6501343023221753);
  });

  test("Calcula a correlaação de dois arrys - com 0", async () => {
    analiseDados2.adicionarDados([0]);
    var outroConjunto = [0]; 

    expect(analiseDados2.calcularCorrelacao(outroConjunto)).toBeNull();
  });

})