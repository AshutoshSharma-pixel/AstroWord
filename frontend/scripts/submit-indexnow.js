const https = require('https');

async function run() {
  try {
    console.log('IndexNow: Fetching sitemap URLs...');
    // Fetch sitemap.xml dynamically from the live site
    const sitemapUrl = 'https://www.astroword.in/sitemap.xml';
    const sitemapXml = await fetchText(sitemapUrl);
    
    // Extract <loc> URLs using regex
    const urlRegex = /<loc>(https:\/\/www\.astroword\.in\/[^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = urlRegex.exec(sitemapXml)) !== null) {
      urls.push(match[1]);
    }

    if (urls.length === 0) {
      console.log('IndexNow: No URLs found in sitemap.');
      return;
    }

    console.log(`IndexNow: Found ${urls.length} URLs in sitemap. Submitting...`);

    const payload = JSON.stringify({
      host: 'www.astroword.in',
      key: '301bd46ed835476da88621805484dea0',
      keyLocation: 'https://www.astroword.in/301bd46ed835476da88621805484dea0.txt',
      urlList: urls
    });

    const response = await postJson('https://api.indexnow.org/IndexNow', payload);
    console.log('IndexNow: Submission successful. Response:', response);
  } catch (err) {
    // SILENT FAILURE: Print warning, but do NOT fail the build process
    console.warn('IndexNow: Submission skipped or failed (this does not affect the build):', err.message);
  }
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch sitemap (HTTP ${res.statusCode})`));
        }
      });
    }).on('error', reject);
  });
}

function postJson(url, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve(data || `OK (status ${res.statusCode})`);
        } else {
          reject(new Error(`HTTP status ${res.statusCode}: ${data || 'No response details'}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

run();
