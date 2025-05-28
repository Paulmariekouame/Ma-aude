// Variables globales
let musicPlaying = false
let particlesInterval
let heartsInterval

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Animation d'entrée du contenu
  setTimeout(() => {
    document.getElementById("mainContent").style.opacity = "1"
    document.getElementById("mainContent").style.transform = "translateY(0)"
  }, 500)

  // Initialiser les particules et cœurs
  createParticles()
  createFloatingHearts()

  // Gestionnaire pour le bouton musique
  document.getElementById("musicBtn").addEventListener("click", toggleMusic)

  // Démarrer les animations
  startAnimations()
})

// Fonction pour jouer/arrêter la musique
function toggleMusic() {
  const audio = document.getElementById("birthdayMusic")
  const btn = document.getElementById("musicBtn")
  const text = document.getElementById("musicText")

  if (!musicPlaying) {
    audio
      .play()
      .then(() => {
        musicPlaying = true
        text.textContent = "Musique en cours... 🎵"
        btn.classList.add("btn-success")
        btn.classList.remove("btn-pink")
      })
      .catch((error) => {
        console.error("Erreur lors de la lecture de la musique:", error)
        alert("Impossible de jouer la musique. Veuillez vérifier que le fichier audio est présent.")
      })
  } else {
    audio.pause()
    musicPlaying = false
    text.textContent = "Jouer la musique 🎵"
    btn.classList.remove("btn-success")
    btn.classList.add("btn-pink")
  }
}

// Fonction pour aller à la page enveloppe
function goToEnvelope() {
  window.location.href = "envelope.html"
}

// Créer des particules flottantes
function createParticles() {
  const container = document.getElementById("particles-container")

  function addParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 3 + "s"
    particle.style.animationDuration = 3 + Math.random() * 2 + "s"

    container.appendChild(particle)

    // Supprimer la particule après l'animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 5000)
  }

  // Ajouter des particules régulièrement
  particlesInterval = setInterval(addParticle, 300)

  // Ajouter quelques particules initiales
  for (let i = 0; i < 20; i++) {
    setTimeout(addParticle, i * 100)
  }
}

// Créer des cœurs flottants
function createFloatingHearts() {
  const container = document.getElementById("hearts-container")

  function addHeart() {
    const heart = document.createElement("div")
    heart.className = "heart-particle"
    heart.innerHTML = "❤"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.animationDelay = Math.random() * 5 + "s"

    container.appendChild(heart)

    // Supprimer le cœur après l'animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 8000)
  }

  // Ajouter des cœurs régulièrement
  heartsInterval = setInterval(addHeart, 1000)

  // Ajouter quelques cœurs initiaux
  for (let i = 0; i < 5; i++) {
    setTimeout(addHeart, i * 500)
  }
}

// Démarrer toutes les animations
function startAnimations() {
  // Animation des éléments au scroll (si nécessaire)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  })

  // Observer tous les éléments animés
  document.querySelectorAll('[class*="animate-"]').forEach((el) => {
    observer.observe(el)
  })
}

// Nettoyage avant de quitter la page
window.addEventListener("beforeunload", () => {
  if (particlesInterval) clearInterval(particlesInterval)
  if (heartsInterval) clearInterval(heartsInterval)
})

// Effet de survol sur les boutons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Effet de clic sur les images d'anime
document.querySelectorAll(".anime-circle").forEach((circle) => {
  circle.addEventListener("click", function () {
    this.style.transform = "scale(1.2) rotate(360deg)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
    }, 500)
  })
})
