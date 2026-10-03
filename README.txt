# ❤️ Birthday Love Story Website

## Folder structure
- index.html
- style.css
- script.js
- assets/images/
- assets/music.mp3 (optional)

## How to personalize
Open `script.js` and edit the `CONFIG` section at the top.

Change:
- `herName`
- `yourName`
- `birthday`
- `photos`
- `story`
- `reasons`
- `letter`

## Adding photos
Put your images inside:
`assets/images/`

Then update the photo list in `script.js`, for example:
{src:"assets/images/photo1.jpg", caption:"Our first memory ❤️"}

The website currently expects photo1.jpg through photo10.jpg.

## Adding music
Put an MP3 file at:
`assets/music.mp3`

Music will NOT autoplay. The circular music button lets the visitor play/pause it.

## Running
Double-click `index.html`, or use VS Code + Live Server for the best experience.

The experience flows through 9 full-screen pages:
1. Opening surprise
2. Birthday hero
3. Memories
4. Our story
5. Things I love
6. Secret message
7. Scrapbook collage
8. Birthday countdown
9. Final envelope + customizable letter


DIRECT PHOTO UPLOAD
--------------------
You can now upload photos directly inside the website. Tap any photo frame and choose an image from your phone/computer.
- Hero photo: tap the large photo frame on the birthday page.
- Memory photos: tap any gallery photo.
- Scrapbook photos: tap any collage photo.
Photos are previewed immediately and saved in your browser using localStorage. No server is required.
