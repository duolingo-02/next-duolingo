import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TrueFalseQuiz from './TrueFalseQuiz';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import SentenceOrderQuiz from './SentenceOrder';
import { Lesson } from '../../types/Game';
import { useDispatch } from 'react-redux';
import { incrementEnergy, incrementProgressPercentage, decrementLives } from '../../redux/actions/gameActions';
import { useDecodeToken } from '../../hooks/useDecode';
import GameBar from './GameBar';
import VideoCamera from './VideoCamera';


const Play: React.FC = () => {
  const router = useRouter();
  const { languageId, stageId } = router.query;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [useCameraMode, setUseCameraMode] = useState(false);
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/user/totalPoints', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTotalPoints(response.data.totalPoints);
        }
      } catch (error) {
        console.error('Error fetching total points:', error);
      }
    };
  
    fetchTotalPoints();
  }, []);
  const dispatch = useDispatch();
  
  const decodedToken = useDecodeToken();
  const userId = decodedToken?.userId;
  useEffect(() => {
    const fetchLessons = async () => {
      if (!router.isReady) return;
  
      const { languageId, stageId, lessonId } = router.query;
  
      if (languageId && stageId) {
        try {
          const response = await axios.get(`/api/lessons/${stageId}/language/${languageId}`);
          if (response.data && response.data.lesson) {
            console.log('Lessons data received:', response.data);
            setLessons([response.data.lesson]);
            setAllLessons(response.data.totalLessons);
            
            const initialIndex = lessonId 
              ? response.data.totalLessons.findIndex((lesson: Lesson) => lesson.id === Number(lessonId))
              : 0;
            
            setCurrentLessonIndex(initialIndex !== -1 ? initialIndex : 0);
            setLoading(false);
          } else {
            setError('No lessons available for this stage.');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching lessons:', error);
          setError('Failed to load lessons. Please try again.');
          setLoading(false);
        }
      }
    };
  
    fetchLessons();
  }, [router.isReady, router.query , languageId, stageId ]);
  
  const handleNextOrRestart = () => {
    console.log('handleNextOrRestart called');
    console.log('isCorrect:', isCorrect);
    console.log('currentLessonIndex:', currentLessonIndex);
   
  
    if (isCorrect) {
      const nextLessonIndex = currentLessonIndex + 1;
      console.log('Next lesson index:', nextLessonIndex);
  console.log();
  
      if (nextLessonIndex < allLessons.length) {
        console.log('Moving to next lesson');
        setCurrentLessonIndex(nextLessonIndex);
        setIsCorrect(null); // Reset isCorrect for the next question
        const nextLesson = allLessons[nextLessonIndex];
        router.push(`/language/${languageId}/stages/${nextLesson.id}/play?lessonId=${nextLesson.id}`);
      } else {
        console.log('All lessons completed, redirecting to stage selection');
        router.push(`/language/${languageId}/stages`);
      }
    } else {
      console.log('Restarting current lesson');
      setIsCorrect(null);
      setLives(3);
      setPoints(0);
      setProgress(0);
      router.reload();
    }
  };
  
  const handleAnswer = async (answerIsCorrect: boolean) => {
    console.log('handleAnswer called');
    console.log('answerIsCorrect:', answerIsCorrect);
  
    setIsCorrect(answerIsCorrect);
    if (answerIsCorrect) {
      dispatch(incrementEnergy(1));
      dispatch(incrementProgressPercentage(10));
  
      // Calculate points based on consecutive correct answers
      let multiplier;
      if (consecutiveCorrectAnswers === 0) multiplier = 1;
      else if (consecutiveCorrectAnswers === 1) multiplier = 2;
      else multiplier = 5;
  
      const pointsToAdd = 10 * multiplier;
  
      setPoints(prevPoints => prevPoints + pointsToAdd);
      setConsecutiveCorrectAnswers(prev => prev + 1);
      setProgress(prevProgress => prevProgress + (100 / lessons.length));
  
      try {
        if (userId !== null && stageId) {
          console.log('Updating progress:', { userId, lessonId: currentLesson.id });
          await axios.post('/api/lessonsUsers/post', {
            userId,
            lessonId: currentLesson.id,
            progress: 100,
            isCompleted: true,
          });
          console.log('Progress updated successfully');
  
          // Update total points in the database
          const token = localStorage.getItem('token');
          if (token) {
            await axios.post(
              '/api/user/updatePoints',
              { pointsToAdd },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Total points updated successfully');
          }
        }
      } catch (error) {
        console.error('Error updating progress or points:', error);
      }
    } else {
      dispatch(decrementLives());
      setLives(prevLives => prevLives - 1);
      setConsecutiveCorrectAnswers(0); // Reset consecutive correct answers
    }
  };
  

  const handleBack = () => {
    router.push(`/language/${languageId}/stages`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (lessons.length === 0) return <div>No lessons available.</div>;

  const currentLesson = allLessons[currentLessonIndex];

  const renderQuiz = () => {
    const commonProps = {
      onAnswer: handleAnswer,
      onNextOrRestart: handleNextOrRestart,
      onBack: handleBack,
      isCorrect,
      lives,
      points,
      progress,
    };
  
    if (useCameraMode) {
      return (
        <VideoCamera
          key={currentLesson.id}
          question={currentLesson.question}
          quizType={currentLesson.type.toLowerCase() as "multiple" | "true_false" | "order"}
          correctAnswer={currentLesson.answer || (currentLesson.isTrue ? 'True' : 'False') || currentLesson.correctOrder || ''}
          options={currentLesson.options || undefined}
scrambledSentence={currentLesson.scrambledSentence || undefined}
          language={languageId === "2" ? "fr" : "en"}
          {...commonProps}
        />
      );
    }
  
    switch (currentLesson.type.toLowerCase()) {
      case 'multiple':
        return (
          <MultipleChoiceQuiz
            key={currentLesson.id}
            question={currentLesson.question}
            options={currentLesson.options || []}
            correctAnswer={currentLesson.answer || ''}
            language={languageId === "2" ? "fr" : "en"}
            {...commonProps}
          />
        );
      case 'true_false':
        return (
          <TrueFalseQuiz
            key={currentLesson.id}
            statement={currentLesson.question}
            isTrue={currentLesson.isTrue || false}
            language={languageId === "2" ? "fr" : "en"}
            {...commonProps}
          />
        );
      case 'order':
        return (
          <SentenceOrderQuiz
            key={currentLesson.id}
            question={currentLesson.question}
            scrambledSentence={currentLesson.scrambledSentence || []}
            correctOrder={currentLesson.correctOrder || []}
            language={languageId === "2" ? "fr" : "en"}
            {...commonProps}
          />
        );
      default:
        return <div>Unknown quiz type: {currentLesson.type}</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-nebula opacity-10"></div>
      <div className="relative z-10">
        <GameBar 
          initialTimerValue={300} 
          lives={lives}
          points={points}
          progress={progress}
        />
        <div className="pt-16 px-4">
          
          {renderQuiz()}
        </div>
      </div>
    </div>
  );
}
export default Play;