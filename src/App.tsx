import React, { useRef } from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { SupportedModels, Face, Keypoint } from '@tensorflow-models/face-landmarks-detection';
import { BoundingBox } from '@tensorflow-models/face-landmarks-detection/dist/shared/calculators/interfaces/shape_interfaces';
import { FaceLandmarksDetector, FaceLandmarksDetectorInput } from '@tensorflow-models/face-landmarks-detection';
import { MediaPipeFaceMeshTfjsModelConfig } from '@tensorflow-models/face-landmarks-detection/dist/tfjs/types';
import Webcam from "react-webcam";
// import { Button, Card, CardContent, CardMedia } from '@mui/material';

function App() {
  const webcamRef: React.RefObject<any> = useRef(null);
  const canvasRef: React.RefObject<any> = useRef(null);

  // Since Tensorflow released 2.0.0, we should choose one of the model
  // tfjs-backend-cpu, tfjs-backend-webgl or tfjs-backend-wasm to run your model.
  // tf.setBackend('cpu');
  tf.setBackend('webgl');
  // tf.setBackend('wasm');

  const LandmarksDetection = async () => {
    const model: SupportedModels = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig: MediaPipeFaceMeshTfjsModelConfig = {
      runtime: 'tfjs',  // supported values: tfjs or mediapipe
      refineLandmarks: false,
      // solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    }
    const detector: FaceLandmarksDetector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    setInterval(() => {
      detect(detector);
    }, 100); // detect every 'n' milliseconds.
  };

  const detect = async (detector: FaceLandmarksDetector) => {
    // run following code only if video is available.
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4  // HTMLMediaElement.HAVE_ENOUGH_DATA (4)
    ) {
      // get the Video Properties
      const video: HTMLVideoElement = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const input: FaceLandmarksDetectorInput = video; // one of the supported input is video
      const detectedFaces: Face[] = await detector.estimateFaces(input);
      if (detectedFaces.length > 0) {
        const ctx = canvasRef.current.getContext("2d"); // get canvas context
        const face: Face = detectedFaces[0];  // for testing, let us draw dots only on first face

        const keyPoints: Keypoint[] = face.keypoints;
        const bBox: BoundingBox = face.box;

        if (keyPoints) {
          // The window.requestAnimationFrame() method tells the browser we wish to perform an animation.
          // It requests the browser to call a user-supplied callback function before the next repaint.
          window.requestAnimationFrame(() => {

            const box = {
              x: bBox.xMin,
              y: bBox.yMin,
              width: (bBox.xMax - bBox.xMin),
              height: (bBox.yMax - bBox.yMin)
            };

            // Draw BoundingBox
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            // ctx.fillStyle = 'blue';
            ctx.strokeRect(box.x, box.y, box.width, box.height);
            ctx.fill();

            // draw landmark points
            for (let i = 0; i < keyPoints.length; i++) {
              const x = keyPoints[i].x;
              const y = keyPoints[i].y;
              ctx.beginPath();
              ctx.arc(x, y, 1, 0, 3 * Math.PI);
              ctx.fillStyle = "yellow";
              ctx.fill();
            }
          });
        }
      }
    }
  };

  LandmarksDetection();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam className="Webcam1-style"
          ref={webcamRef}
        />
        <canvas
          ref={canvasRef}
          className="Webcam1-canvas"
        />
      </header>
    </div>
  );
}

export default App;
