import React, { useRef, useEffect, useState } from 'react';

interface CameraInteractionProps {
  onSelect: (option: string) => void;
  options: string[];
}

const CameraInteraction: React.FC<CameraInteractionProps> = ({ onSelect, options }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawOptionsAndDetectGesture = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw option areas
      options.forEach((option, index) => {
        const x = (index % 2) * (canvas.width / 2);
        const y = Math.floor(index / 2) * (canvas.height / 2);
        const width = canvas.width / 2;
        const height = canvas.height / 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(option, x + 10, y + 30);
      });

      // Here you would implement gesture detection logic
      // For simplicity, we'll just use a click event for now
    };

    const intervalId = setInterval(drawOptionsAndDetectGesture, 1000 / 30); // 30 FPS

    return () => clearInterval(intervalId);
  }, [options]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const optionIndex = Math.floor(x / (canvas.width / 2)) + Math.floor(y / (canvas.height / 2)) * 2;
    if (optionIndex < options.length) {
      onSelect(options[optionIndex]);
    }
  };

  return (
    <div className="relative">
      <video ref={videoRef} autoPlay className="hidden" />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="rounded-lg shadow-lg"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default CameraInteraction;