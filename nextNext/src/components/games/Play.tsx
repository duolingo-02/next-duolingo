import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import TrueFalseQuiz from './TrueFalseQuiz';
import SentenceOrderQuiz from './SentenceOrder';
import { Lesson } from '../../types/Game';
import { useDispatch } from 'react-redux';
import { incrementEnergy, incrementProgressPercentage, decrementLives } from '../../redux/actions/gameActions';

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

  const dispatch = useDispatch();

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

  const handleQuizComplete = (quizPoints: number) => {
    setPoints(prevPoints => prevPoints + quizPoints);
    dispatch(incrementEnergy(1));
    dispatch(incrementProgressPercentage(10));
    
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prevIndex => prevIndex + 1);
    } else {
      // All lessons completed, redirect to stage selection
      router.push(`/language/${languageId}/stages`);
    }
  };

  const handleIncorrectAnswer = () => {
    dispatch(decrementLives());
    setLives(prevLives => prevLives - 1);
  };

  const updateProgress = () => {
    setProgress(prevProgress => prevProgress + (100 / lessons.length));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (lessons.length === 0) return <div>No lessons available.</div>;

  const currentLesson = lessons[currentLessonIndex];

  const renderQuiz = () => {
    switch (currentLesson.type.toLowerCase()) {
      case 'multiple':
        return (
          <MultipleChoiceQuiz
            key={currentLesson.id}
            questions={[{
              question: currentLesson.question,
              options: currentLesson.options || [],
              answer: currentLesson.answer || ''
            }]}
            language={languageId === "2" ? "fr" : "en"}
            onComplete={handleQuizComplete}
            onIncorrectAnswer={handleIncorrectAnswer}
            updateProgress={updateProgress}
          />
        );
      case 'true_false':
        return (
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
        );
      case 'order':
        return (
          <SentenceOrderQuiz
            key={currentLesson.id}
            questions={[{
              question: currentLesson.question,
              options: currentLesson.scrambledSentence || [],
              answer: currentLesson.correctOrder?.join(" ") || "",
              correctOrder: currentLesson.correctOrder || []
            }]}
            language={languageId === "2" ? "fr" : "en"}
            onComplete={handleQuizComplete}
            onIncorrectAnswer={handleIncorrectAnswer}
            updateProgress={updateProgress}
          />
        );
      default:
        return <div>Unknown quiz type: {currentLesson.type}</div>;
    }
  };

  return (
    <div>
      <h2>Lesson {currentLessonIndex + 1}</h2>
      <div>Lives: {lives}</div>
      <div>Points: {points}</div>
      <div>Progress: {progress.toFixed(2)}%</div>
      {renderQuiz()}
    </div>
  );
};

export default Play;