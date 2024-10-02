// import React, { useRef, useState, useEffect } from 'react';
// import GameContainer from './GameContainer';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import * as handpose from '@tensorflow-models/handpose';

// // Initialize TensorFlow.js
// tf.setBackend('webgl').then(() => {
//   console.log('TensorFlow.js initialized with WebGL backend');
// }).catch(error => {
//   console.error('Failed to initialize TensorFlow.js:', error);
// });

// interface VideoCameraProps {
//   question: string;
//   quizType: 'true_false' | 'multiple' | 'order';
//   correctAnswer: boolean | string | string[];
//   options?: string[];
//   scrambledSentence?: string[];
//   language: string;
//   onAnswer: (isCorrect: boolean, answer?: string | string[]) => void;
//   onNextOrRestart: () => void;
//   onBack: () => void;
//   isCorrect: boolean | null;
//   lives: number;
//   points: number;
//   progress: number;
// }

// const VideoCamera: React.FC<VideoCameraProps> = ({
//   question,
//   quizType,
//   correctAnswer,
//   options,
//   scrambledSentence,
//   language,
//   onAnswer,
//   onNextOrRestart,
//   onBack,
//   isCorrect,
//   lives,
//   points,
//   progress
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [model, setModel] = useState<handpose.HandPose | null>(null);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [selectedWords, setSelectedWords] = useState<string[]>([]);
//   const [showSubmit, setShowSubmit] = useState(false);
//   const [showNextBack, setShowNextBack] = useState(false);
//   const [showRestartBack, setShowRestartBack] = useState(false);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//         setStream(mediaStream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     };

//     const loadHandposeModel = async () => {
//       try {
//         const loadedModel = await handpose.load();
//         setModel(loadedModel);
//         console.log('Handpose model loaded successfully');
//       } catch (error) {
//         console.error('Error loading handpose model:', error);
//       }
//     };

//     startCamera();
//     loadHandposeModel();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!model || !videoRef.current || !canvasRef.current) return;

//     const detectHands = async () => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       if (!video || !canvas) return;

//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;

//       const predictions = await model.estimateHands(video);

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       if (predictions.length > 0) {
//         const hand = predictions[0];
//         const palmBase = hand.landmarks[0];
//         const x = palmBase[0];
//         const y = palmBase[1];

//         ctx.beginPath();
//         ctx.arc(x, y, 10, 0, 2 * Math.PI);
//         ctx.fillStyle = 'red';
//         ctx.fill();

//         handleInteraction(x, y, canvas.width, canvas.height);
//       }

//       drawOptions(ctx, canvas.width, canvas.height);
//     };

//     const intervalId = setInterval(detectHands, 100);

//     return () => clearInterval(intervalId);
//   }, [model, quizType, options, scrambledSentence, selectedWords, showSubmit, showNextBack, showRestartBack]);

//   const handleInteraction = (x: number, y: number, width: number, height: number) => {
//     console.log('handleInteraction called', { x, y, width, height });

//     if (quizType === 'true_false') {
//       if (y < height * 0.8) {
//         const selectedValue = x < width / 2 ? 'True' : 'False';
//         console.log('True/False selected:', selectedValue);
//         setSelectedAnswer(selectedValue);
//       }
//     } else if (quizType === 'multiple' && options) {
//       const optionHeight = height * 0.8 / options.length;
//       const selectedIndex = Math.floor(y / optionHeight);
//       if (selectedIndex >= 0 && selectedIndex < options.length) {
//         console.log('Multiple choice selected:', options[selectedIndex]);
//         setSelectedAnswer(options[selectedIndex]);
//       }
//     } else if (quizType === 'order' && scrambledSentence) {
//       const wordWidth = width / scrambledSentence.length;
//       const wordIndex = Math.floor(x / wordWidth);
//       const word = scrambledSentence[wordIndex];

//       if (y < height / 2) {
//         if (!selectedWords.includes(word)) {
//           console.log('Word selected:', word);
//           setSelectedWords([...selectedWords, word]);
//         } else {
//           console.log('Word deselected:', word);
//           setSelectedWords(selectedWords.filter(w => w !== word));
//         }
//       }
//     }

//     // Handle submit button interaction
//     if (y > height * 0.8 && y < height * 0.9) {
//       if (x > width * 0.4 && x < width * 0.6) {
//         console.log('Submit button clicked');
//         handleSubmit();
//       }
//     }

//     // Handle back/next/restart buttons
//     if (y > height * 0.9) {
//       if (x < width / 3) {
//         console.log('Back button clicked');
//         onBack();
//       } else if (x > width * 2 / 3) {
//         if (showNextBack || showRestartBack) {
//           console.log('Next/Restart button clicked');
//           onNextOrRestart();
//         }
//       }
//     }
//   };

//   const handleSubmit = () => {
//     console.log('handleSubmit called');
//     let answer: string | string[];
//     let isCorrect: boolean;

//     if (quizType === 'true_false' || quizType === 'multiple') {
//       if (!selectedAnswer) {
//         console.log('No answer selected');
//         return;
//       }
//       answer = selectedAnswer;
//       isCorrect = answer.toLowerCase() === String(correctAnswer).toLowerCase();
//     } else if (quizType === 'order') {
//       answer = selectedWords;
//       isCorrect = answer.join(' ').toLowerCase() === (correctAnswer as string[]).join(' ').toLowerCase();
//     } else {
//       console.log('Invalid quiz type');
//       return;
//     }

//     console.log('Submitting answer:', { answer, correctAnswer, isCorrect });
//     onAnswer(isCorrect, answer);
//     setShowSubmit(false);
//     if (isCorrect) {
//       setShowNextBack(true);
//     } else {
//       setShowRestartBack(true);
//     }
//   };

//   const drawOptions = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     console.log('drawOptions called', { width, height, quizType });
//     ctx.font = '24px Arial';
//     ctx.textAlign = 'center';
//     ctx.fillStyle = 'white';

//     if (quizType === 'true_false') {
//       ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
//       ctx.fillRect(0, 0, width / 2, height * 0.8);
//       ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
//       ctx.fillRect(width / 2, 0, width / 2, height * 0.8);
//       ctx.fillStyle = 'white';
//       ctx.fillText('True', width / 4, height / 2);
//       ctx.fillText('False', 3 * width / 4, height / 2);
//     } else if (quizType === 'multiple' && options) {
//       const optionHeight = height * 0.8 / options.length;
//       options.forEach((option, index) => {
//         ctx.fillStyle = selectedAnswer === option ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 0, 255, 0.3)';
//         ctx.fillRect(0, index * optionHeight, width, optionHeight);
//         ctx.fillStyle = 'white';
//         ctx.fillText(option, width / 2, (index + 0.5) * optionHeight);
//       });
//     } else if (quizType === 'order' && scrambledSentence) {
//       const wordWidth = width / scrambledSentence.length;
//       scrambledSentence.forEach((word, index) => {
//         ctx.fillText(word, (index + 0.5) * wordWidth, height / 4);
//         if (selectedWords.includes(word)) {
//           ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
//           ctx.fillRect(index * wordWidth, 0, wordWidth, height / 2);
//           ctx.fillStyle = 'white';
//         }
//       });

//       // Draw selected words
//       const selectedWordWidth = width / selectedWords.length;
//       selectedWords.forEach((word, index) => {
//         ctx.fillText(word, (index + 0.5) * selectedWordWidth, height * 3 / 4);
//       });
//     }

//     // Draw selected answer or words
//     ctx.fillStyle = 'yellow';
//     if (quizType === 'true_false' || quizType === 'multiple') {
//       if (selectedAnswer) {
//         ctx.fillText(`Selected: ${selectedAnswer}`, width / 2, height * 0.75);
//       }
//     } else if (quizType === 'order') {
//       ctx.fillText(`Selected: ${selectedWords.join(' ')}`, width / 2, height * 0.75);
//     }

//     // Draw submit button
//     ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
//     ctx.fillRect(width * 0.4, height * 0.8, width * 0.2, height * 0.1);
//     ctx.fillStyle = 'white';
//     ctx.fillText('Submit', width / 2, height * 0.85);

//     // Draw back/next/restart buttons
//     ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
//     ctx.fillRect(0, height * 0.9, width / 3, height * 0.1);
//     ctx.fillRect(width * 2 / 3, height * 0.9, width / 3, height * 0.1);
//     ctx.fillStyle = 'white';
//     ctx.fillText('Back', width / 6, height * 0.95);
//     if (showNextBack) {
//       ctx.fillText('Next', width * 5 / 6, height * 0.95);
//     } else if (showRestartBack) {
//       ctx.fillText('Restart', width * 5 / 6, height * 0.95);
//     }
//   };

//   return (
//     <GameContainer progress={progress}>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 rounded-3xl shadow-2xl">
//         <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">Video Camera Quiz</h1>
//         <p className="text-2xl font-semibold text-white mb-6">{question}</p>
//         <div className="relative">
//           <video ref={videoRef} autoPlay className="mb-4 rounded-lg shadow-lg" style={{ width: '640px', height: '480px' }} />
//           <canvas
//             ref={canvasRef}
//             width={640}
//             height={480}
//             className="absolute top-0 left-0 mb-4 rounded-lg shadow-lg"
//           />
//         </div>
//         {isCorrect !== null && (
//           <p className={`text-2xl font-bold mt-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
//             {isCorrect ? "Correct!" : "Incorrect!"}
//           </p>
//         )}
//       </div>
//     </GameContainer>
//   );
// };

// export default VideoCamera;