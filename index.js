const express = require('express');
const { clientId, clientSecret, port } = require('./config.json');
const app = express();
const { request } = require('undici');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use('/public', express.static(__dirname + 'public'))
app.use(express.static('views')); //assuming the authorized.html file is located in the 'views' directory

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/', async ({ query }, response) => {
    try {
        const { code } = query;

        if (!code) {
            return response.sendFile(__dirname + '/index.html');
        }

        const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:${port}`,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const oauthData = await tokenResponseData.body.json();

        response.redirect(`/authorized?token=${oauthData.access_token}`);

    } catch (error) {
        console.error(error);
        return response.status(500).send('An error occurred');
    }
});

app.get('/authorized', async ({ headers }, response) => {
    try {
        const userResult = await request('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${headers.authorization}`,
            },
        });

        const userData = await userResult.body.json();

        response.sendFile('authorized.html', { root: '.' });

    } catch (error) {
        console.error(error);
        return response.status(500).send('An error occurred');
    }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));