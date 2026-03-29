# Nagarajan Digital Business Card

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Single-page digital business card app for Nagarajan, Sales Officer
- Profile photo (circular, from uploaded screenshot)
- Name, title, contact info (phone, email, location)
- Action buttons: Save Contact (vCard download), Call Now (tel: link), WhatsApp (wa.me link), Location (maps link), Share this Card (Web Share API), Show QR Code (modal with QR)
- QR code modal showing the card URL
- Mobile-first layout, max-width ~420px centered

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Static frontend-only app (no backend needed)
2. Profile photo: use the uploaded screenshot crop or a placeholder avatar
3. vCard generation for Save Contact button
4. All buttons use a unified, cohesive color palette (no rainbow buttons)
5. QR code via a library (qrcode.react)
6. Responsive, polished card design
