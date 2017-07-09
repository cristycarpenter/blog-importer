const express = require('express')
const https = require('https');
const router = express.Router()

/* GET Customer Groups page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
});

/* Send POST Request */
router.post('/submit', (req, res) => {

	 let blogPosts = JSON.parse(req.body.fileDisplayArea);
	 

	for (var i = 0; i < blogPosts.length; i++) {
    		
    	  console.log(blogPosts[i]); //test array

    	  let storeUrl = req.body.storeUrl;
		  let apiUsername = req.body.apiUsername;
		  let apiToken = req.body.apiToken;
		  let blogPost = JSON.stringify(blogPosts[i]);
		  let encode1 = apiUsername + ":" + apiToken;
		  let encode2 = new Buffer(encode1).toString('base64');
		  let credentials = "Basic" + " " + encode2;
		  let options = {
			    host: storeUrl,
			    path: '/api/v2/blog/posts',
			    method: 'POST',
			    headers: {
			        'Content-Type': 'application/json',
			        'Authorization': credentials,
			        'Accept': 'application/json'
			    },
			};

			https.request(options, function (response) {
			    body = '';
			    response.on('data', function (chunk) {
			        body += chunk;
			    });
			    response.on('end', function () {
			        console.log(res.statusCode);
			        console.log(body);
			        results = body.replace(/[\]\[\"\"\{\}]/g, '')
			        res.render('index', {body:results})
			    });

			})
			.end(blogPost);

		  console.log(storeUrl);
		  console.log(apiUsername);
		  console.log(apiToken);

	}

});

module.exports = router