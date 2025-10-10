# SER AGRO - Drones Agrícolas

## Overview

SER AGRO is a corporate website for an agricultural drone distributor specializing in DJI equipment. The site showcases agricultural drones (DJI AGRAS T50, T100, and Mavic 3 Multispectral) with product pages, technical documentation downloads, firmware updates, and an AI-powered chat assistant named "Mavilda" for customer support. The site is built as a static multi-page website with vanilla JavaScript for interactivity.

## User Preferences

Preferred communication style: Simple, everyday language.

### Critical Configuration Rules
- **⚠️ NEVER recreate workflows using `workflows_set_run_config_tool`** - this overwrites port mappings
- **Port Configuration**: Internal port 5000 MUST map to external port 5000 (not :80)
  - User manually configured this in Networking tool
  - Always use `restart_workflow` to restart the server, never create new workflows
  - Port mapping is saved in `.replit` file (lines 46-47: `localPort = 5000, externalPort = 5000`)
- **Workflow Management**: Only use `restart_workflow("Server")` to restart - NEVER use `workflows_set_run_config_tool`

## System Architecture

### Frontend Architecture
- **Static Multi-Page Site**: Pure HTML5, CSS3, and vanilla JavaScript without any framework
- **Responsive Design**: Mobile-first approach with CSS media queries and responsive navigation
- **Video Integration**: Hero sections with autoplay background videos for product showcasing
- **Navigation Pattern**: Consistent header across all pages with dropdown menus for equipment and downloads

### Page Structure
- **Homepage** (`index.html`): Landing page with company introduction
- **Product Pages**: Dedicated pages for each drone model (T50, T100, Mavic 3)
- **Firmware Page** (`firmware-generador.html`): Generator firmware update instructions
- **Consistent Layout**: All pages share the same header/navigation structure

### Interactive Features
- **Mobile Navigation**: Hamburger menu with toggle functionality (`main-app.js`)
- **Dropdown Menus**: Equipment and downloads sections with hover/click interactions
- **AI Chat Widget** (`js/mavilda-chat.js`): Customer support chatbot integration
  - Session-based conversations with unique session IDs
  - Webhook integration for backend processing
  - Auto-greeting functionality
  - Floating oval button with green brand colors (#2E7D32)
  - Agent image: "mavilda ingeniera agronoma.png"
- **WhatsApp Float Button** (`main-app.js`): Direct contact button
  - Green circular button (#25D366)
  - Positioned 110px from bottom for optimal spacing with Mavilda button
  - Updated phone number: +54 (93465) 432688

### Styling Approach
- **CSS Variables**: Centralized color scheme and theme configuration
- **Custom Properties**: Agricultural green color palette (primary: #2E7D32, secondary: #1B5E20)
- **Responsive Components**: Flexible layouts that adapt to different screen sizes
- **Video Backgrounds**: Full-screen video heroes with overlay content

### Asset Management
- **Static Assets**: Images stored in `/imagenes/` directory
- **PDF Downloads**: Technical datasheets in `/attached_assets/` directory
- **Video Content**: Product videos for hero sections

## External Dependencies

### Analytics & Tracking
- **Google Analytics (gtag.js)**: Conversion tracking with ID `AW-17289441166`
  - Implemented across all pages for consistent analytics
  - Tracks user interactions and conversions

### Third-Party Integrations
- **Chat Backend**: Railway-hosted webhook service
  - URL: `https://primary-production-396f31.up.railway.app/webhook/mavilda-chat`
  - Purpose: AI chat assistant backend for customer support
  - Session-based conversation management

### External Resources
- **Google Fonts**: Open Sans font family for typography
- **Font Awesome**: Icon library (Kit: 14b830158f.js) used in some components

### Deployment Platform
- **Replit Hosting**: Site is configured for deployment on Replit's hosting service
- **No Build Process**: Static files served directly without compilation or bundling

### Contact Information
- Phone: +54 (93465) 432688
- WhatsApp: +54 (93465) 432688
- Email: ser.agro@gruposer.com.ar
- Physical Location: Omar Carrasco 2776, Rosario, Argentina

## Recent Changes (October 2025)

### JavaScript Architecture Update
- Renamed `script.js` → `main-app.js` for better cache management
- Renamed `js/chat-widget.js` → `js/mavilda-chat.js` for better cache management
- Implemented aggressive cache-busting strategy with version parameters
- Custom Python HTTP server (`server.py`) with no-cache headers to prevent browser caching issues

### UI/UX Improvements
- Updated Mavilda chat button design to green oval with "Chatea con la ingeniera Mavilda" text
- Desktop floating button spacing: WhatsApp at 110px from bottom, Mavilda at 20px (90px separation)
- Desktop horizontal positioning: Both buttons at 40px from right edge
- Mobile floating button spacing: WhatsApp at 75px from bottom, Mavilda at 15px (60px separation, 160px width)
- Mobile horizontal positioning: WhatsApp at 50px from right, Mavilda at 40px from right
- Updated all WhatsApp contact numbers from 5493401514509 to 5493465432688
- Changed Mavilda agent image to "mavilda ingeniera agronoma.png"
- Fixed mobile/desktop cache issues with file renaming and meta tags
- Cache-busting version updated to v=1760119657 (JS and CSS)
- Fixed CSS !important override issue in style.css for mobile button positioning
- Floating buttons optimized for mobile: WhatsApp at 50px from edge, Mavilda at 40px from edge
- Desktop buttons at 40px from right edge for consistent spacing
- Added SO_REUSEADDR to server.py for immediate port reuse after restart