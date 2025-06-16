let etapa = 0;
let tempoEtapa = 0;
let caminhoneteX = -100;
let tratorX = 100;
let tratorX2 = -200;
let clientePisca = false;
let arrozColhido = [];
let clienteX = 800;
let falaClienteMostrada = false;
let tempoRespostaVendedor = 0;
let carros = [];
let agricultores = [];

function setup() {
  createCanvas(900, 550);
  textAlign(CENTER, CENTER);
  textSize(18);
  frameRate(60);
  iniciarCampoArroz();
  iniciarAgricultores();
  iniciarCarros();
}

function draw() {
  background(220);

  if (etapa === 0) mostrarPlantio();
  else if (etapa === 1) mostrarColheita();
  else if (etapa === 2) mostrarEntrega();
  else if (etapa === 3) mostrarVenda();

  tempoEtapa++;

  if (etapa === 3 && falaClienteMostrada && millis() - tempoRespostaVendedor > 4000) {
    etapa = 0;
    tempoEtapa = 0;
    caminhoneteX = -100;
    tratorX = 100;
    tratorX2 = -200;
    clientePisca = false;
    clienteX = 800;
    falaClienteMostrada = false;
    tempoRespostaVendedor = 0;
    iniciarCampoArroz();
    iniciarAgricultores();
    iniciarCarros();
  }

  if (etapa !== 3 && tempoEtapa > 300) {
    etapa = (etapa + 1) % 4;
    tempoEtapa = 0;
    caminhoneteX = -100;
    tratorX = 100;
    tratorX2 = -200;
    clientePisca = false;
    clienteX = 800;
    falaClienteMostrada = false;
    tempoRespostaVendedor = 0;
    if (etapa === 1) iniciarCampoArroz();
    if (etapa === 0) iniciarAgricultores();
    if (etapa === 2) iniciarCarros();
  }
}

function iniciarCampoArroz() {
  arrozColhido = [];
  for (let i = 50; i < width; i += 60) {
    for (let j = 300; j < height - 20; j += 50) {
      arrozColhido.push({ x: i, y: j, colhido: false });
    }
  }
}

function iniciarAgricultores() {
  agricultores = [
    { x: 0, y: 270, cor: color(180, 80, 80) },
    { x: -100, y: 280, cor: color(80, 80, 180) }
  ];
}

function iniciarCarros() {
  carros = [];
  for (let i = 0; i < 3; i++) {
    carros.push({ x: random(-300, 0), y: 370, dir: 1, cor: color(random(255), random(255), random(255)) });
    carros.push({ x: random(width, width + 300), y: 410, dir: -1, cor: color(random(255), random(255), random(255)) });
  }
}

function mostrarPlantio() {
  background(135, 206, 250);
  drawCeuSol();
  drawNuvens();
  fill(139, 69, 19);
  rect(0, 300, width, 250);

  fill(34, 139, 34);
  noStroke();
  for (let i = 50; i < width; i += 60) {
    for (let j = 300; j < height - 20; j += 50) {
      ellipse(i, j, 10, 30);
    }
  }

  for (let a of agricultores) {
    drawPessoaDetalhada(a.x, a.y, a.cor);
    a.x += 1.5;
    if (a.x > width + 40) a.x = -50;
  }

  drawArvore(100, 250);
  drawArvore(750, 260);

  fill(0);
  text("Etapa 1: Plantio do Arroz", width / 2, 40);
  text("Agricultores trabalham com dedicação plantando os grãos.", width / 2, 70);
}

function mostrarColheita() {
  background(255, 223, 186);
  drawCeuSol();
  drawNuvens();

  fill(218, 165, 32);
  noStroke();
  for (let i = 0; i < arrozColhido.length; i++) {
    if (!arrozColhido[i].colhido) {
      ellipse(arrozColhido[i].x, arrozColhido[i].y, 10, 30);
    }
  }

  drawTratorDetalhado(tratorX, 260, color(255, 0, 0));
  drawTratorDetalhado(tratorX2, 320, color(0, 128, 255));
  tratorX += 2;
  tratorX2 += 1.5;

  for (let i = 0; i < arrozColhido.length; i++) {
    if (!arrozColhido[i].colhido) {
      if ((tratorX < arrozColhido[i].x + 10 && tratorX + 100 > arrozColhido[i].x - 10) ||
          (tratorX2 < arrozColhido[i].x + 10 && tratorX2 + 100 > arrozColhido[i].x - 10)) {
        arrozColhido[i].colhido = true;
      }
    }
  }

  fill(0);
  text("Etapa 2: Colheita do Arroz", width / 2, 40);
  text("Tratores modernos colhem o arroz com alta eficiência.", width / 2, 70);
}

function mostrarEntrega() {
  background(180, 220, 255);
  drawCeuSol();

  // Asfalto
  fill(50);
  rect(0, 350, width, 100);

  // Faixa central pontilhada
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < width; i += 40) {
    line(i, 400, i + 20, 400);
  }

  noStroke();
  drawCaminhoneteDetalhada(caminhoneteX, 340);
  caminhoneteX += 2;

  for (let carro of carros) {
    fill(carro.cor);
    rect(carro.x, carro.y, 60, 30, 5);
    fill(0);
    ellipse(carro.x + 15, carro.y + 30, 15);
    ellipse(carro.x + 45, carro.y + 30, 15);
    carro.x += 2 * carro.dir;
    if (carro.dir === 1 && carro.x > width + 50) carro.x = -100;
    if (carro.dir === -1 && carro.x < -100) carro.x = width + 50;
  }

  drawSemaforo(600, 300);

  // Mercado reposicionado à esquerda do semáforo
  fill(245, 245, 220);
  rect(450, 250, 120, 130);
  fill(255);
  rect(470, 270, 80, 30);
  fill(0);
  textSize(14);
  text("Mercado", 510, 285);
  textSize(18);

  fill(0);
  text("Etapa 3: Transporte até o Mercado", width / 2, 40);
  text("O arroz segue embalado em segurança até os centros urbanos.", width / 2, 70);
}

function mostrarVenda() {
  background(240);

  fill(200);
  rect(100, 100, 700, 400);
  fill(255);
  rect(120, 130, 150, 300);
  rect(630, 130, 150, 300);
  fill(210, 180, 140);
  rect(350, 350, 200, 100);

  fill(255, 255, 100);
  rect(130, 150, 30, 30);
  rect(130, 200, 30, 30);
  rect(130, 250, 30, 30);
  rect(650, 150, 30, 30);
  rect(650, 200, 30, 30);

  if (clienteX > 470) {
    clienteX -= 2;
  } else if (!falaClienteMostrada) {
    falaClienteMostrada = true;
    tempoRespostaVendedor = millis();
  }

  drawPessoaDetalhada(370, 370, color(210, 105, 30)); // vendedor
  drawPessoaDetalhada(clienteX, 370, color(30, 144, 255)); // cliente

  fill(255);
  stroke(0);
  textSize(14);

  if (falaClienteMostrada) {
    text("tem aquele arroz Rampínele ai meu parceiro?", clienteX, 300);
    if (millis() - tempoRespostaVendedor > 2000) {
      text("pra você com certeza meu querido", 470, 280);
    }
  }

  fill(0);
  noStroke();
  textSize(18);
  text("Etapa 4: Venda ao Cliente", width / 2, 40);
  text("O arroz chega fresquinho e com qualidade ao consumidor.", width / 2, 70);
}

// Elementos visuais

function drawCeuSol() {
  noStroke();
  fill(135, 206, 250);
  rect(0, 0, width, 300);
  fill(255, 215, 0);
  ellipse(100, 100, 80, 80);
  fill(255, 255, 224, 100);
  ellipse(100, 100, 150, 150);
}

function drawNuvens() {
  fill(255);
  noStroke();
  ellipse(200, 100, 60, 40);
  ellipse(230, 100, 50, 30);
  ellipse(210, 90, 50, 30);
  ellipse(600, 80, 70, 40);
  ellipse(630, 80, 50, 30);
  ellipse(610, 70, 50, 30);
}

function drawTratorDetalhado(x, y, c) {
  fill(c);
  rect(x, y, 100, 40, 5);
  rect(x + 10, y - 30, 60, 30, 5);
  fill(0);
  ellipse(x + 20, y + 40, 30, 30);
  ellipse(x + 80, y + 40, 30, 30);
  fill(255);
  rect(x + 15, y - 25, 20, 20);
  rect(x + 45, y - 25, 20, 20);
}

function drawCaminhoneteDetalhada(x, y) {
  fill(100, 100, 255);
  rect(x, y, 100, 40, 8);
  fill(255);
  rect(x + 10, y - 20, 60, 20, 5);
  fill(0);
  ellipse(x + 20, y + 40, 20, 20);
  ellipse(x + 80, y + 40, 20, 20);
}

function drawPessoaDetalhada(x, y, c) {
  fill(c);
  ellipse(x, y, 40, 40);
  rect(x - 15, y + 20, 30, 50, 5);
  fill(0);
  ellipse(x - 5, y - 5, 5, 5);
  ellipse(x + 5, y - 5, 5, 5);
  stroke(0);
  line(x - 10, y + 40, x - 30, y + 60);
  line(x + 10, y + 40, x + 30, y + 60);
  line(x, y + 70, x - 10, y + 90);
  line(x, y + 70, x + 10, y + 90);
  noStroke();
}

function drawArvore(x, y) {
  fill(139, 69, 19);
  rect(x, y, 20, 50);
  fill(34, 139, 34);
  ellipse(x + 10, y, 60, 60);
  ellipse(x - 10, y - 20, 50, 50);
  ellipse(x + 30, y - 10, 50, 50);
}

function drawSemaforo(x, y) {
  fill(50);
  rect(x, y - 60, 20, 60);
  fill(255, 0, 0);
  ellipse(x + 10, y - 50, 10);
  fill(255, 255, 0);
  ellipse(x + 10, y - 35, 10);
  fill(0, 255, 0);
  ellipse(x + 10, y - 20, 10);
}
