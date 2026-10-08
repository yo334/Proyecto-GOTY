import os
import re

root_dir = r"c:\Users\Federico\OneDrive\Documentos\GitHub\6to\Actividades_web_6to\Proyecto_GOTY"

header_template = """    <!-- ═══════════════════ TOP NAV ═══════════════════ -->
    <nav class="top-nav">
        <div class="nav-left">
            <a href="{prefix}index.html" class="nav-logo-link">
                <img src="{prefix}imagenes/logo_white.png" alt="The Game Awards" class="nav-logo">
            </a>
        </div>
        <div class="nav-right">
            <!-- Inline Search Box -->
            <div class="nav-search-container" id="nav-search-container">
                <div class="search-panel" id="search-panel">
                    <div class="search-panel__input-wrap">
                        <svg class="search-panel__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" id="search-input" class="search-panel__input"
                            placeholder="Buscar..." autocomplete="off" />
                        <button class="search-panel__close" id="search-close" aria-label="Cerrar búsqueda">✕</button>
                    </div>
                    <div class="search-panel__results" id="search-results"></div>
                </div>
            </div>
            
            <button class="nav-link nav-search-toggle" id="nav-search-toggle" aria-label="Buscar">
                <svg class="nav-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>BUSCAR</span>
            </button>
            <a href="{prefix}index.html#years-section" class="nav-link">VER GANADORES</a>
            <a href="{prefix}seleccionar_encuesta.html" class="nav-link">VOTAR</a>
        </div>
    </nav>"""

scripts_template = """    <!-- Scripts -->
    <script src="{prefix}js/search.js"></script>
    <script>
        // Search overlay toggle
        const toggleBtn = document.getElementById('nav-search-toggle');
        const searchContainer = document.getElementById('nav-search-container');
        const closeBtn  = document.getElementById('search-close');
        const navSearchInput = document.getElementById('search-input');

        function openSearch(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            searchContainer.classList.add('active');
            
            setTimeout(() => navSearchInput.focus(), 120);
        }
        function closeSearch(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            searchContainer.classList.remove('active');
            
        }

        if(toggleBtn) toggleBtn.addEventListener('click', openSearch);
        if(closeBtn) closeBtn.addEventListener('click', closeSearch);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

        // Nav shrink on scroll
        const topNav = document.querySelector('.top-nav');
        if(topNav) {
            window.addEventListener('scroll', () => {
                topNav.classList.toggle('top-nav--scrolled', window.scrollY > 60);
            });
        }
    </script>"""

html_files = []
for root, dirs, files in os.walk(root_dir):
    for f in files:
        if f.endswith(".html") and f != "index.html":
            html_files.append(os.path.join(root, f))

for file in html_files:
    rel_path = os.path.relpath(file, root_dir)
    prefix = "../" if "Años" in rel_path else ""
    
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = re.sub(r'<nav\b[^>]*>.*?</nav>', header_template.replace("{prefix}", prefix), content, flags=re.DOTALL)
    
    if "js/search.js" not in content:
        content = content.replace("</body>", scripts_template.replace("{prefix}", prefix) + "\n</body>")
        
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Updated HTML files!")
