const path = require("path");
const express = require("express");
const ytdl = require('ytdl-core')
const fs = require('fs')

const app = express(); // create express app

const cors = require('cors')


app.get('/download', async (req, res) => {
    try {
        const url = req.query.url
        const videoId = await ytdl.getURLVideoID(url)
        const metaInfo = await ytdl.getInfo(url)

        let data = {
            url: 'http://www.youtube.com/embed/' + videoId,
            info: metaInfo.formats
        }

        return res.send(data)

    } catch (err) {
        return res.status(500)
    }
})
// add middlewares\
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});



// start express server on port 5000
app.listen(5001, () => {
    console.log("server started on port 5001");
});
