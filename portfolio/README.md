# RD / Build System Portfolio

A static personal portfolio for Romeo Dagohoy. It uses only HTML, CSS, and plain browser JavaScript—there is no framework, package manager, build step, server, or dependency to install.

## Open it

Open `index.html` directly in a modern browser, or upload the whole folder to any static hosting service.

## Update the content

Edit `js/data.js` for the name, contact links, skills, projects, experience, credentials, resume availability, and image paths. The main HTML is intentionally kept structural; repeatable content is rendered from this one data file.

## Add assets

- Profile image: `assets/images/profile.jpg`
- Moderator images: `assets/images/moderator/`
- AnimePlaka images: `assets/images/animeplaka/`
- Tindog images: `assets/images/tindog/`
- Resume: `assets/Romeo-Dagohoy-Resume.pdf`

Add the real resume, then set `resumeAvailable` to `true` in `js/data.js`. Missing images automatically show designed placeholders rather than broken-image icons.

## Contact form

The form is interface-only by design. It does not send email until you connect an approved form or backend service.
