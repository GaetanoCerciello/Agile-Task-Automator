#!/usr/bin/env python3
"""
Genera 5 screenshot professionali per Chrome Web Store
Dimensioni: 1280x800 pixel, formato PNG 24-bit (no alpha)
"""

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1280, 800

# Colori
WHITE = (255, 255, 255)
DARK = (31, 41, 55)
GRAY = (107, 114, 128)
PRIMARY = (102, 126, 234)
SUCCESS_BG = (240, 253, 244)
SUCCESS_TEXT = (22, 197, 94)

def create_screenshot_1():
    """Screenshot 1: Popup - Markdown Format"""
    img = Image.new('RGB', (WIDTH, HEIGHT), (245, 245, 245))
    draw = ImageDraw.Draw(img)
    
    # Load fonts with fallback
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
        font_text = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 11)
    except:
        font_title = font_text = ImageFont.load_default()
    
    # Background
    draw.rectangle([(0, 0), (WIDTH, HEIGHT)], fill=WHITE)
    
    # Title
    draw.text((40, 30), "📸 Screenshot 1: Popup con Task Catturato - MARKDOWN", fill=PRIMARY, font=font_title)
    
    # Content box
    draw.rectangle([(40, 80), (1240, 750)], fill=(249, 250, 251), outline=(229, 231, 235), width=2)
    
    # Mock content
    y = 100
    content = [
        "🚀 AGILE TASK AUTOMATOR - Popup Window",
        "",
        "Button: [📄 Cattura Task]  [🗑️ Cancella]",
        "Formato: [Markdown]  [HTML]",
        "",
        "OUTPUT TEXT AREA:",
        "─" * 80,
        "# Implementare autenticazione OAuth2",
        "**Fonte:** TRELLO | **Data:** 29/03/2026",
        "",
        "## 📋 Descrizione",
        "Aggiungiamo supporto OAuth2 all'API gateway per migliorare",
        "la sicurezza e permettere integrazione con provider come Google e GitHub.",
        "",
        "## 👤 User Story",
        "Come developer",
        "Voglio implementare OAuth2 authentication",
        "Affinché l'API sia sicura e scalabile",
        "",
        "## ✅ Acceptance Criteria",
        "- [ ] API accetta e valida token OAuth2",
        "- [ ] Integrazione con Google e GitHub providers",
        "- [ ] Token refresh automatico ogni 24 ore",
        "- [ ] Error handling per token scaduti (401)",
        "- [ ] Tests unitari con >90% coverage",
        "- [ ] Documentazione API aggiornata",
        "- [ ] Deploy in staging completato",
        "",
        "## 🛠️ Note Tecniche",
        "Stack: Node.js 18+ | Express.js | jsonwebtoken | passport.js",
        "Database: MongoDB con indexes su 'userId'",
        "Security: HTTPS enforced, secrets in .env",
        "API Endpoint: POST /api/auth/oauth2/authorize",
        "",
        "✅ Task catturato con successo!"
    ]
    
    for line in content:
        draw.text((60, y), line, fill=GRAY, font=font_text)
        y += 18
    
    return img

def create_screenshot_2():
    """Screenshot 2: HTML Output Format"""
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
        font_text = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 11)
    except:
        font_title = font_text = ImageFont.load_default()
    
    draw.text((40, 30), "📸 Screenshot 2: HTML Output Format - Professionally Formatted", fill=PRIMARY, font=font_title)
    
    # HTML Preview Box
    draw.rectangle([(40, 80), (1240, 750)], fill=(25, 41, 55), outline=(100, 100, 150), width=2)
    
    y = 100
    html_content = [
        "<html lang='it'>",
        "<head>",
        "  <style>",
        "    body { font-family: Arial; max-width: 900px; margin: 20px auto; }",
        "    h1 { color: #667eea; }",
        "    ul { list-style: none; }",
        "    li::before { content: '☑ '; color: #22c55e; }",
        "  </style>",
        "</head>",
        "<body>",
        "  <h1>📄 Implementare autenticazione OAuth2</h1>",
        "  <p><strong>Fonte:</strong> TRELLO | <strong>Data:</strong> 29/03/2026</p>",
        "  <hr>",
        "  <h2>📋 Descrizione</h2>",
        "  <p>Aggiungiamo supporto OAuth2 all'API gateway...</p>",
        "  <h2>👤 User Story</h2>",
        "  <blockquote>",
        "    <p>Come developer<br>",
        "    Voglio implementare OAuth2<br>",
        "    Affinché l'API sia sicura</p>",
        "  </blockquote>",
        "  <h2>✅ Acceptance Criteria</h2>",
        "  <ul>",
        "    <li>API accetta token OAuth2</li>",
        "    <li>Validazione token funziona</li>",
        "    <li>Errori gestiti correttamente</li>",
        "    <li>Tests creati e passati</li>",
        "  </ul>",
        "  <h2>🛠️ Note Tecniche</h2>",
        "  <p>Stack: Node.js, Express, JWT, Passport.js</p>",
        "</body>",
        "</html>",
    ]
    
    for line in html_content:
        draw.text((60, y), line, fill=(200, 220, 255), font=font_text)
        y += 18
    
    return img

def create_screenshot_3():
    """Screenshot 3: Trello Integration"""
    img = Image.new('RGB', (WIDTH, HEIGHT), (240, 240, 245))
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
        font_text = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 11)
    except:
        font_title = font_text = ImageFont.load_default()
    
    draw.text((40, 30), "📸 Screenshot 3: Integrazione Trello - Real-Time Task Capture", fill=PRIMARY, font=font_title)
    
    # Trello Board (left)
    draw.rectangle([(40, 80), (650, 750)], fill=(229, 230, 241), outline=(150, 150, 150), width=2)
    draw.text((60, 100), "TRELLO BOARD - Task List", fill=DARK, font=font_title)
    
    # Cards
    for i, title in enumerate(["Design API", "Write Tests", "OAuth2 Auth"]):
        y = 150 + (i * 180)
        draw.rectangle([(60, y), (220, y+150)], fill=WHITE, outline=(150, 150, 150), width=1)
        draw.text((70, y+15), title, fill=DARK, font=font_text)
        draw.text((70, y+45), "Due: 31 March", fill=GRAY, font=font_text)
        draw.text((70, y+130), "🏷️ Backend", fill=GRAY, font=font_text)
    
    # Extension Popup (right)
    draw.rectangle([(700, 80), (1240, 750)], fill=WHITE, outline=(100, 100, 100), width=2)
    
    # Gradient header
    for y_line in range(80, 140):
        ratio = (y_line - 80) / 60
        r = int(102 + (118 - 102) * ratio)
        g = int(126 + (75 - 126) * ratio)
        b = int(234 + (162 - 234) * ratio)
        draw.line([(700, y_line), (1240, y_line)], fill=(r, g, b))
    
    draw.text((970, 105), "🚀 Agile Task Automator", fill=WHITE, font=font_title)
    
    # Popup content
    draw.text((720, 160), "Task Captured: 'Implement OAuth2'", fill=DARK, font=font_text)
    
    draw.rectangle([(720, 190), (1220, 380)], fill=(249, 250, 251), outline=(229, 231, 235), width=1)
    
    y = 210
    for line in [
        "# Implement OAuth2",
        "## User Story",
        "Come developer voglio OAuth2",
        "## AC: [ ] API accetta tokens",
        "[ ] Security validated",
        "## Stack: Node.js + Express"
    ]:
        draw.text((740, y), line, fill=GRAY, font=font_text)
        y += 26
    
    # Buttons
    draw.rectangle([(720, 410), (870, 450)], fill=(102, 126, 234), outline=None)
    draw.text((795, 420), "📄 Cattura", fill=WHITE, font=font_text)
    
    draw.rectangle([(1070, 410), (1220, 450)], fill=(243, 244, 246), outline=(200, 200, 200), width=1)
    draw.text((1145, 420), "🗑️ Cancella", fill=DARK, font=font_text)
    
    # Status
    draw.rectangle([(720, 470), (1220, 520)], fill=SUCCESS_BG, outline=SUCCESS_TEXT, width=2)
    draw.text((740, 485), "✅ Task catturato! Pronto per essere copiato o esportato.", fill=SUCCESS_TEXT, font=font_text)
    
    return img

def create_screenshot_4():
    """Screenshot 4: User Story Detail"""
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 16)
        font_text = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 11)
    except:
        font_title = font_text = ImageFont.load_default()
    
    draw.text((40, 30), "📸 Screenshot 4: User Story Strutturata - Enterprise Ready", fill=PRIMARY, font=font_title)
    
    y = 90
    sections = [
        ("👤 USER STORY:", [
            "Come: Team Developer",
            "Voglio: Implementare OAuth2 nella API",
            "Affinché: L'autenticazione sia sicura e scalabile"
        ]),
        ("✅ ACCEPTANCE CRITERIA:", [
            "☐ API gateway accetta e valida token OAuth2",
            "☐ Integrazione con provider (Google, GitHub, Microsoft)",
            "☐ Token refresh automatico ogni 24 ore",
            "☐ Error handling completo per token scaduti (401)",
            "☐ Rate limiting implementato",
            "☐ Tests unitari con >90% coverage",
            "☐ Documentazione API aggiornata",
            "☐ Deploy in staging completato"
        ]),
        ("🛠️ NOTE TECNICHE:", [
            "Stack: Node.js 18+, Express.js, jsonwebtoken, passport.js",
            "Database: MongoDB con indexes su 'userId' e 'token_expiry'",
            "Security: HTTPS enforced, segreti in .env file",
            "API Endpoint: POST /api/auth/oauth2/authorize",
            "Response: { access_token, refresh_token, expires_in }"
        ])
    ]
    
    for title, items in sections:
        draw.rectangle([(40, y-10), (1240, y+15)], fill=(237, 233, 254), outline=(150, 100, 150), width=1)
        draw.text((50, y), title, fill=PRIMARY, font=font_title)
        y += 40
        
        for item in items:
            draw.text((60, y), item, fill=GRAY, font=font_text)
            y += 22
        
        y += 15
    
    return img

def create_screenshot_5():
    """Screenshot 5: Features Overview"""
    img = Image.new('RGB', (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
        font_text = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 12)
    except:
        font_title = font_text = ImageFont.load_default()
    
    # Gradient header
    for y_line in range(0, 80):
        ratio = y_line / 80
        r = int(102 + (118 - 102) * ratio)
        g = int(126 + (75 - 126) * ratio)
        b = int(234 + (162 - 234) * ratio)
        draw.line([(0, y_line), (WIDTH, y_line)], fill=(r, g, b))
    
    draw.text((640, 35), "🚀 AGILE TASK AUTOMATOR - Key Features", fill=WHITE, font=font_title, anchor="mm")
    
    features = [
        ("📄", "Cattura Automatica", "Estrai dati da Trello e Jira istantaneamente"),
        ("📋", "Documentazione Smart", "Genera User Stories e Acceptance Criteria"),
        ("🎨", "Formati Multipli", "Esporta in Markdown o HTML formattato"),
        ("💾", "Salvataggio Locale", "Persisti i dati localmente, zero cloud"),
        ("🔒", "Privacy First", "Manifest V3 compliant, nessun tracking"),
        ("⚡", "Performance", "Cattura dati in <100ms, ultra veloce")
    ]
    
    y_start = 140
    x_left = 80
    x_right = 700
    
    for i, (icon, title, desc) in enumerate(features):
        if i < 3:
            x, y = x_left, y_start + (i * 200)
        else:
            x, y = x_right, y_start + ((i - 3) * 200)
        
        # Feature card
        draw.rectangle([(x, y), (x + 600, y + 180)], fill=(249, 250, 251), outline=(200, 200, 200), width=2)
        
        # Icon
        draw.text((x + 20, y + 30), icon, fill=PRIMARY, font=font_title)
        
        # Title
        draw.text((x + 120, y + 25), title, fill=DARK, font=font_title)
        
        # Description
        draw.text((x + 120, y + 65), desc, fill=GRAY, font=font_text)
        
        # Checkmark
        draw.text((x + 540, y + 70), "✓", fill=SUCCESS_TEXT, font=font_title)
    
    # Footer
    draw.rectangle([(0, HEIGHT-50), (WIDTH, HEIGHT)], fill=(240, 240, 245), outline=(200, 200, 200), width=1)
    draw.text((640, HEIGHT-25), "Available on Chrome Web Store | Install Free Now!", fill=PRIMARY, font=font_text, anchor="mm")
    
    return img

# Main
if __name__ == "__main__":
    print("🎨 Generando 5 screenshot per Chrome Web Store...")
    print("Dimensioni: 1280x800 pixel, PNG 24-bit (no alpha)")
    print()
    
    screenshots = [
        (create_screenshot_1(), "screenshot-1-popup-markdown.png"),
        (create_screenshot_2(), "screenshot-2-html-output.png"),
        (create_screenshot_3(), "screenshot-3-trello-integration.png"),
        (create_screenshot_4(), "screenshot-4-user-story.png"),
        (create_screenshot_5(), "screenshot-5-features.png")
    ]
    
    import os
    
    for img, filename in screenshots:
        # Ensure RGB without alpha
        if img.mode != 'RGB':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img if img.mode == 'RGBA' else img.convert('RGBA'), (0, 0) if img.mode == 'RGBA' else None)
            img = rgb_img
        
        filepath = f"/Users/producer/agile-task-automator/screenshots/{filename}"
        img.save(filepath, 'PNG', quality=95)
        
        size_kb = os.path.getsize(filepath) / 1024
        print(f"✅ {filename}: {size_kb:.1f}KB - 1280x800 PNG 24-bit")
    
    print("\n✅ Tutti gli screenshot sono pronti per il Chrome Web Store!")
    print("📍 Cartella: /Users/producer/agile-task-automator/screenshots/")
