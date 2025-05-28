// Variables globales
let envelopeOpened = false
let confettiInterval

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Animations d'entrée
  setTimeout(() => {
    document.querySelector(".text-center").style.opacity = "1"
    document.querySelector(".text-center").style.transform = "translateY(0)"
  }, 500)
})

// Fonction pour ouvrir l'enveloppe
function openEnvelope() {
  if (envelopeOpened) return

  const envelope = document.getElementById("envelope")
  const clickText = document.getElementById("clickText")
  const letterCard = document.getElementById("letterCard")

  // Marquer comme ouvert
  envelopeOpened = true

  // Ajouter la classe d'ouverture
  envelope.classList.add("open")

  // Masquer le texte de clic
  clickText.style.opacity = "0"

  // Créer des confettis
  createConfetti()

  // Afficher la lettre après un délai
  setTimeout(() => {
    letterCard.style.display = "block"
    setTimeout(() => {
      letterCard.style.opacity = "1"
      letterCard.style.transform = "translateY(0)"
    }, 100)
  }, 1000)

  // Jouer un son de célébration (si disponible)
  playOpenSound()
}

// Créer des confettis
function createConfetti() {
  const container = document.getElementById("confetti-container")
  const colors = ["#ff69b4", "#ff1493", "#ffc0cb", "#ffb6c1", "#ff91a4"]

  function addConfetti() {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.animationDelay = Math.random() * 2 + "s"

    container.appendChild(confetti)

    // Supprimer après l'animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti)
      }
    }, 3000)
  }

  // Créer beaucoup de confettis
  for (let i = 0; i < 100; i++) {
    setTimeout(addConfetti, i * 50)
  }

  // Continuer pendant quelques secondes
  confettiInterval = setInterval(addConfetti, 100)
  setTimeout(() => {
    if (confettiInterval) {
      clearInterval(confettiInterval)
    }
  }, 5000)
}

// Jouer un son d'ouverture (optionnel)
function playOpenSound() {
  // Créer un son de célébration simple avec Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // Do
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // Mi
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // Sol

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (error) {
    console.log("Web Audio API non supportée")
  }
}

// Fonction pour retourner à la page principale
function goBack() {
  window.location.href = "index.html"
}

// Animations au scroll pour la lettre
function animateOnScroll() {
  const letterCard = document.getElementById("letterCard")
  if (letterCard && letterCard.style.display !== "none") {
    const rect = letterCard.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      letterCard.style.transform = "translateY(0) scale(1)"
    }
  }
}

// Écouter le scroll
window.addEventListener("scroll", animateOnScroll)

// Effet de survol sur l'enveloppe
document.getElementById("envelope").addEventListener("mouseenter", function () {
  if (!envelopeOpened) {
    this.style.transform = "scale(1.05) rotateY(5deg)"
  }
})

document.getElementById("envelope").addEventListener("mouseleave", function () {
  if (!envelopeOpened) {
    this.style.transform = "scale(1) rotateY(0deg)"
  }
})

// Nettoyage
window.addEventListener("beforeunload", () => {
  if (confettiInterval) clearInterval(confettiInterval)
})
