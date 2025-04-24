# gcp-training-javascript

A toy application for very specific demo purposes.

## Local Prerequisites:

- NodeJS installed.
- Docker installed.
- Google Cloud SDK (gcloud) installed and configured (logged into your Google Cloud account).

## Remote Prerequisites:

- A Google Cloud Project with the Cloud Run API and Artifact Registry API enabled.
- An Artifact Registry Docker repository created.

## Development:

### Javascript Run

First install the dependencies:
```
npm install
```

Now run the application locally
```
npm start
```
Once it's running you can curl against localhost:8080 and see the response


### Javascript Tests
To run the unit tests:
```
npm test
```

### Javascript Linting
To run the linter:
```
npm run lint
```

To build the docker image locally run:
```
docker build -t gcp-training-javascript .
```

To test the local image run:
```
docker run --rm -p 9090:8080 --name local-gcp-training-javascript gcp-training-javascript
```
Once it's running you can curl against localhost:9090 and see the response

### GCP

Uploading to Artifact Registry (replace the capitals vars):
```
# authenticate
gcloud auth configure-docker us-west2-docker.pkg.dev

# build your image
docker buildx build --platform linux/amd64 -t us-west2-docker.pkg.dev/ewinslow-cdks2/hello-world/gcp-training-javascript .

# push image
docker push us-west2-docker.pkg.dev/ewinslow-cdks2/hello-world/gcp-training-javascript
```

Deploy to Cloud Run:
```
gcloud run deploy gcp-training-javascript \
  --image us-west2-docker.pkg.dev/ewinslow-cdks2/hello-world/gcp-training-javascript:latest \
  --region us-west2 \
  --allow-unauthenticated
```

Once deployed, gcloud will output the Service URL. You can access your running application at this URL.


## CI/CD

* On push to main
  * build artifact
  * upload to artifact registry
  * deploy artifact to prod
