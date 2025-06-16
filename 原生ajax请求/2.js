const https = require('https');
const querystring = require('querystring');

const postData = querystring.stringify({"name":"simHistotryMonth", "state":4, "appId": "102846", "appKey": "07LZE2Z1G4Qa96it3oIRwDxOyFetKkBM"});

const options = {
    hostname: 'http://10.88.151.15:20883',
    port: 20883,
    path: 'changeScheduleTaskState',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log(body);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(postData);
req.end();