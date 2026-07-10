const fs = require('fs');
const path = require('path');
const https = require('https');

const accountId = '7466a18890c7c21ef3680026e82008a4';
const projectName = 'market-mapping-dashboard';
const zipPath = 'C:/Users/m1896/Documents/kimi/workspace/market-mapping-history/dashboard/deploy.zip';

const token = process.env.CLOUDFLARE_API_TOKEN;
console.log('Token available:', !!token);
if (!token) {
  console.log('No Cloudflare API token found');
  process.exit(1);
}

function createProject() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ name: projectName });
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: '/client/v4/accounts/' + accountId + '/pages/projects',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log('Create project status:', res.statusCode);
        console.log('Response:', body.substring(0, 1000));
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function createDeployment() {
  return new Promise((resolve, reject) => {
    const zipData = fs.readFileSync(zipPath);
    const boundary = '----FormBoundary' + Date.now();
    const crlf = '\r\n';
    
    const metaPart = '--' + boundary + crlf +
      'Content-Disposition: form-data; name="manifest"' + crlf +
      'Content-Type: application/json' + crlf + crlf +
      '{"custom_pages":"false"}' + crlf;
    
    const filePart = '--' + boundary + crlf +
      'Content-Disposition: form-data; name="file"; filename="deploy.zip"' + crlf +
      'Content-Type: application/zip' + crlf + crlf;
    
    const endPart = crlf + '--' + boundary + '--' + crlf;
    
    const bodyParts = [
      Buffer.from(metaPart, 'utf8'),
      Buffer.from(filePart, 'utf8'),
      zipData,
      Buffer.from(endPart, 'utf8')
    ];
    
    const bodyLength = bodyParts.reduce((sum, buf) => sum + buf.length, 0);
    
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: '/client/v4/accounts/' + accountId + '/pages/projects/' + projectName + '/deployments',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Authorization': 'Bearer ' + token,
        'Content-Length': bodyLength
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log('Deploy status:', res.statusCode);
        console.log('Response:', body.substring(0, 2000));
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    
    for (const part of bodyParts) {
      req.write(part);
    }
    req.end();
  });
}

async function main() {
  console.log('Creating project...');
  const projectRes = await createProject();
  
  if (projectRes.status === 200 || projectRes.status === 201) {
    console.log('Project created or exists');
  } else if (projectRes.status === 400 && projectRes.body.errors && projectRes.body.errors.some(e => e.message.includes('already exists'))) {
    console.log('Project already exists');
  } else {
    console.log('Unexpected status, continuing anyway');
  }
  
  console.log('Creating deployment...');
  const deployRes = await createDeployment();
  console.log('Done');
}

main().catch(err => {
  console.error('Error:', err.message);
});
