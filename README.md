## Face Landmarks Detection
- [TensorFlow.js models](https://www.tensorflow.org/js/models)
- [github: Pre-trained TensorFlow.js models](https://github.com/tensorflow/tfjs-models#readme)
- [MediaPipeFaceMesh-TFJS documentation](https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection/src/tfjs)

Facial landmarks detection on browser using tensorflow pre-trained neural network model. The web component of the project is being bootstrapped with React & Typescript.
```bash
# Some of the key components of the applications:
tensorflow/tfjs version: 4.22.0
tensorflow-models/face-landmarks-detection version: 1.0.6
React version: 18.3.1
Typescript version: 4.9.5
```


### setup
```bash
# clone the repository
git clone https://github.com/christ-college/faceLandmark.git


# install dependency packages
cd faceLandmark
npm install


# Builds the application for production, it will create a `build` folder to put the binaries.
npm run build
```


### Runs the app in the development mode
```bash
# cd faceLandmark

# Runs the app in the development mode
# it will launch in a browser with http://localhost:3000
# FYI: The page will get reload in case if you make source code edits
npm run start
```
