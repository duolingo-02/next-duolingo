import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import TrueFalseQuiz from './TrueFalseQuiz';
import SentenceOrderQuiz from './SentenceOrder';
import { Lesson } from '../../types/Game';
import { useDispatch } from 'react-redux';
import { incrementEnergy, incrementProgressPercentage, decrementLives } from '../../redux/actions/gameActions';
import GameBar from './GameBar';
import { useDecodeToken } from '../../hooks/useDecode';

const Play: React.FC = () => {
  const router = useRouter();
  const { languageId, stageId } = router.query;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(0);
  const [initialTimerValue, setInitialTimerValue] = useState(60);

  const dispatch = useDispatch();
  const decodedToken = useDecodeToken();
  const userId = decodedToken?.userId;

  useEffect(() => {
    const fetchLessons = async () => {
      if (languageId && stageId) {
        try {
          const response = await axios.get(`/api/lessons/${stageId}/language/${languageId}`);
          setLessons([response.data]); // Wrap the single lesson in an array
          setLoading(false);
        } catch (error) {
          console.error('Error fetching lessons:', error);
          setError('Failed to load lessons. Please try again.');
          setLoading(false);
        }
      }
    };

    fetchLessons();
  }, [languageId, stageId]);

  const handleQuizComplete = async (quizPoints: number) => {
    setPoints(prevPoints => prevPoints + quizPoints);
    dispatch(incrementEnergy(1));
    dispatch(incrementProgressPercentage(10));
    
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prevIndex => prevIndex + 1);
    } else {
      // All lessons completed, post progress and fetch next stage
      try {
        if (userId && stageId) {
          await axios.post('/api/lessonsUsers/post', {
            userId,
            lessonId: lessons[currentLessonIndex].id,
            progress: 100,
            isCompleted: true,
          });

          // Fetch next stage lessons
          const nextStageId = Number(stageId) + 1;
          const response = await axios.get(`/api/lessons/${nextStageId}/language/${languageId}`);
          setLessons([response.data]); // Wrap the single lesson in an array
          setCurrentLessonIndex(0);
        }
      } catch (error) {
        console.error('Error updating progress or fetching next stage:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleIncorrectAnswer = () => {
    dispatch(decrementLives());
    setLives(prevLives => prevLives - 1);
  };

  const updateProgress = () => {
    setProgress(prevProgress => prevProgress + (100 / lessons.length));
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentLesson = lessons[currentLessonIndex];

  const renderQuiz = () => {
    switch (currentLesson.type.toLowerCase()) {
      case 'multiple':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{currentLesson.question}</h2>
            <MultipleChoiceQuiz
              key={currentLesson.id}
              questions={[{
                id: currentLesson.id,
                question: currentLesson.question,
                options: currentLesson.options || [],
                answer: currentLesson.answer || "",
              }]}
              language={languageId === "2" ? "fr" : "en"}
              onComplete={handleQuizComplete}
              onIncorrectAnswer={handleIncorrectAnswer}
              updateProgress={updateProgress}
            />
          </div>
        );
      case 'true_false':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{currentLesson.question}</h2>
            <TrueFalseQuiz
              key={currentLesson.id}
              questions={[{
                statement: currentLesson.question,
                isTrue: currentLesson.isTrue || false
              }]}
              language={languageId === "2" ? "fr" : "en"}
              onComplete={handleQuizComplete}
              onIncorrectAnswer={handleIncorrectAnswer}
              updateProgress={updateProgress}
            />
          </div>
        );
      case 'order':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{currentLesson.question}</h2>
            <SentenceOrderQuiz
              key={currentLesson.id}
              questions={[{
                id: currentLesson.id,
                question: currentLesson.question,
                options: currentLesson.scrambledSentence || [],
                answer: currentLesson.correctOrder?.join(" ") || "",
                correctOrder: currentLesson.correctOrder || [],
              }]}
              language={languageId === "2" ? "fr" : "en"}
              onComplete={handleQuizComplete}
              onIncorrectAnswer={handleIncorrectAnswer}
              updateProgress={updateProgress}
            />
          </div>
        );
      default:
        return <div>Unknown quiz type: {currentLesson.type}</div>;
    }
  };

  return (
    <div>
      <GameBar lives={lives} points={points} progress={progress} initialTimerValue={initialTimerValue} />
      {renderQuiz()}
    </div>
  );
};

export default Play;