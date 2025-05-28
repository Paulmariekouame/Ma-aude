#!/usr/bin/env python3
"""
Serveur web simple pour héberger le site d'anniversaire d'Aude
Utilise Python avec le module http.server intégré
"""

import http.server
import socketserver
import os
import webbrowser
import threading
import time

# Configuration du serveur
PORT = 8000
DIRECTORY = "."

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def _init_(self, *args, **kwargs):
        super()._init_(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Ajouter des en-têtes CORS pour éviter les problèmes de sécurité
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Personnaliser les messages de log
        print(f"🌸 {self.address_string()} - {format % args}")

def open_browser():
    """Ouvre automatiquement le navigateur après un délai"""
    time.sleep(2)
    webbrowser.open(f'http://localhost:{PORT}')

def start_server():
    """Démarre le serveur web"""
    try:
        # Changer vers le répertoire du script
        script_dir = os.path.dirname(os.path.abspath(_file_))
        os.chdir(script_dir)
        
        # Créer le serveur
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print("🎉" + "="*50 + "🎉")
            print("🌸  SERVEUR D'ANNIVERSAIRE POUR AUDE  🌸")
            print("🎉" + "="*50 + "🎉")
            print(f"🎂 Serveur démarré sur le port {PORT}")
            print(f"🌟 Accédez au site via: http://localhost:{PORT}")
            print(f"💖 Ou via votre IP locale sur le réseau")
            print("🎵 Appuyez sur Ctrl+C pour arrêter le serveur")
            print("🎉" + "="*50 + "🎉")
            
            # Ouvrir le navigateur automatiquement
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            # Démarrer le serveur
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🌸 Serveur arrêté. Merci d'avoir utilisé le site d'Aude ! 💖")
    except OSError as e:
        if e.errno == 48:  # Port déjà utilisé
            print(f"❌ Erreur: Le port {PORT} est déjà utilisé.")
            print("💡 Essayez de changer le PORT dans le script ou fermez l'autre application.")
        else:
            print(f"❌ Erreur lors du démarrage du serveur: {e}")
    except Exception as e:
        print(f"❌ Erreur inattendue: {e}")

if _name_ == "_main_":
    start_server()
