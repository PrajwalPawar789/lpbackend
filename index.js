// index.js

const { LinkedInProfileScraper } = require('linkedin-profile-scraper');

(async () => {
  try {
    const scraper = new LinkedInProfileScraper({
      sessionCookieValue: 'AQEDAREzUtICiFl5AAABjDVNNGQAAAGOUnX25k0ARCrdOD6MjAc-Wcu-BgfMhA2WnJ6E_Hv2_hgfnh8gP2qjmIH5pPi9bN2oGurRHShdajvHLriZ_vivvX-OBfJ9LYPA7R1DaSRkdZrxzRy6tV_8ds4J',
      keepAlive: true // Set to true for faster recurring scrapes
    });

    // Login into LinkedIn
    await scraper.setup();

    // Run the scraper for the provided LinkedIn profile URL
    const result = await scraper.run('https://www.linkedin.com/in/natfriedman/');

    console.log(result);
  } catch (err) {
    if (err.name === 'SessionExpired') {
      // Do something when the scraper notifies you it's not logged-in anymore
      console.error('LinkedIn session expired. Please obtain a new session cookie value.');
    } else {
      console.error('Error:', err.message);
    }
  }
})();
