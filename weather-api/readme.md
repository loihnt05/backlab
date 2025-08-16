# Weather API 

# Implementation

- Start by creating a simple API that returns a hardcoded weather response. This will help you understand how to structure your API and how to handle requests.
- Use environment variables to store the API key and the Redis connection string. This way, you can easily change them without having to modify your code.
- Make sure to handle errors properly. If the 3rd party API is down, or if the city code is invalid, make sure to return the appropriate error message.
- Use some package or module to make HTTP requests e.g. if you are using Node.js, you can use the axios package, if you are using Python, you can use the requests module.
- Implement rate limiting to prevent abuse of your API. You can use a package like express-rate-limit if you are using Node.js or flask-limiter if you are using Python.
