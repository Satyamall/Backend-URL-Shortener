
// packages needed in this file
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

// creating express route handler
const router = express.Router()

// import the Url database model
const Url = require('../model/url.model')

// @route    POST /api/url/shorten
// @description     Create short URL

// The API base Url endpoint
const baseUrl = 'http:localhost:5000'

router.post('/api/url/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body // destructure the longUrl from req.body.longUrl

    // check base url if valid using the validUrl.isUri method
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    // if valid, we create the url code
    const urlCode = shortid.generate()

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        try {
            /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
            let url = await Url.findOne({
                longUrl
            })

            // url exist and return the respose
            if (url) {
                res.json(url)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

router.delete('/api/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await Url.deleteOne({ _id: id });
      res.status(200).json({ message: "url deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
})

router.get('/api', async (req, res) => {
        try {
            const url = await Url.find({})
            // url exist and return the respose
            if (!url) {
                res.status(400).json("No Shortend Url");
            }
            res.status(200).json(url);
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
})


// : app.get(/:code)
// @route       GET /:code
// @description    Redirect to the long/original URL 
router.get('/:code', async (req, res) => {
    try {
        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router