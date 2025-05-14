// Inicializar AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
      duration: 1000, // duração da animação em ms
      once: true, // anima uma única vez ao entrar na tela
      disable: "mobile", // desativa em dispositivos móveis para melhor performance
    })
  })
  
  // Conteúdo dos slides
  const conteudoSlides = [
    "Utilize terra vegetal ou substrato comercial vendido em casas agricolas ou floriculturas.",
    "Encha os saquinhos com a terra, faça um pequeno buraco de 1 a 2 cm de profundidade com o dedo.",
    "Coloque sementes 1 ou 2 por buraco.",
    "Cubra com uma fina camada de terra.",
    "Regar uma vez por dia, não deixar secar o substrato até germinar, (NÃO ENCHARCAR A TERRA)",
    "Germina entre 15 dias (as vezes pode demorar mais)",
    "Fazer o transplante para local definitivo após 120 a 150 dias do plantio.",
    "Após 15 dias do transplante faça uma adubação com esterco de curral ou adubo comercial.",
  ]
  
  // Variáveis do slideshow
  let slideAtual = 0
  let temporizador
  let temporizadorBarra
  const duracaoSlide = 7000 // 7 segundos
  
  // Inicializar o slideshow
  function iniciarSlideshow() {
    const slidesContainer = document.getElementById("planting-slides")
  
    // Verificar se o container existe
    if (!slidesContainer) return
  
    // Criar os slides
    conteudoSlides.forEach((texto, index) => {
      const slide = document.createElement("div")
      slide.className = "planting-slide"
      slide.innerHTML = `
              <div class="planting-slide-content">
                  <p>${texto}</p>
              </div>
          `
      slidesContainer.appendChild(slide)
    })
  
    // Mostrar o primeiro slide
    mostrarSlide(0)
    iniciarTemporizador()
  
    // Adicionar suporte para gestos de deslize em dispositivos móveis
    adicionarSuporteGestos()
  }
  
  // Mostrar um slide específico
  function mostrarSlide(n) {
    const slides = document.getElementsByClassName("planting-slide")
    const indicador = document.getElementById("slideIndicator")
  
    if (!slides.length || !indicador) return
  
    // Ajustar o índice se estiver fora dos limites
    if (n >= slides.length) {
      slideAtual = 0
    } else if (n < 0) {
      slideAtual = slides.length - 1
    } else {
      slideAtual = n
    }
  
    // Esconder todos os slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }
  
    // Mostrar o slide atual
    slides[slideAtual].style.display = "block"
  
    // Atualizar o indicador de slide
    indicador.textContent = `${slideAtual + 1}/${slides.length}`
  }
  
  // Navegar para o próximo ou anterior slide
  function navegarSlide(n) {
    mostrarSlide(slideAtual + n)
    reiniciarTemporizador()
  }
  
  // Iniciar o temporizador para avançar automaticamente
  function iniciarTemporizador() {
    const barraProgresso = document.getElementById("progressBar")
    if (!barraProgresso) return
  
    // Limpar temporizadores existentes
    clearTimeout(temporizador)
    clearInterval(temporizadorBarra)
  
    // Resetar a barra de progresso
    barraProgresso.style.width = "0%"
  
    // Iniciar novo temporizador para avançar o slide
    temporizador = setTimeout(() => {
      navegarSlide(1)
    }, duracaoSlide)
  
    // Animar a barra de progresso
    let progresso = 0
    temporizadorBarra = setInterval(() => {
      progresso += 100 / (duracaoSlide / 100) // Incrementar a cada 100ms
      if (progresso >= 100) {
        progresso = 100
        clearInterval(temporizadorBarra)
      }
      barraProgresso.style.width = progresso + "%"
    }, 100)
  }
  
  // Reiniciar o temporizador
  function reiniciarTemporizador() {
    iniciarTemporizador()
  }
  
  // Adicionar suporte para gestos de deslize em dispositivos móveis
  function adicionarSuporteGestos() {
    const slideshow = document.querySelector(".planting-slideshow")
    if (!slideshow) return
  
    let touchStartX = 0
    let touchEndX = 0
  
    // Eventos de toque
    slideshow.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )
  
    slideshow.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        gerenciarGestoDeslize()
      },
      { passive: true },
    )
  
    // Determinar direção do deslize
    function gerenciarGestoDeslize() {
      // Definir um limiar mínimo para considerar como deslize (evita toques acidentais)
      const limiarDeslize = 50
  
      if (touchEndX < touchStartX - limiarDeslize) {
        // Deslize para a esquerda (próximo slide)
        navegarSlide(1)
      } else if (touchEndX > touchStartX + limiarDeslize) {
        // Deslize para a direita (slide anterior)
        navegarSlide(-1)
      }
    }
  }
  
  // Ajustar slideshow quando a janela for redimensionada
  window.addEventListener("resize", () => {
    // Reiniciar temporizador para garantir que a barra de progresso esteja sincronizada
    reiniciarTemporizador()
  })
  
  // Iniciar o slideshow quando a página carregar
  window.addEventListener("load", iniciarSlideshow)
  
  // Expor funções para uso global (necessário para os botões onclick no HTML)
  window.navegarSlide = navegarSlide
  window.reiniciarTemporizador = reiniciarTemporizador
  