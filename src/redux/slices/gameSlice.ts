import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  lessons: any[];
  currentLessonIndex: number;
  points: number;
  lives: number;
  progress: number;
}

const initialState: GameState = {
  lessons: [],
  currentLessonIndex: 0,
  points: 0,
  lives: 3,
  progress: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<any[]>) => {
      state.lessons = action.payload;
    },
    setCurrentLessonIndex: (state, action: PayloadAction<number>) => {
      state.currentLessonIndex = action.payload;
    },
    incrementCurrentLessonIndex: (state) => {
      state.currentLessonIndex += 1;
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    setLives: (state, action: PayloadAction<number>) => {
      state.lives = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const {
  setLessons,
  setCurrentLessonIndex,
  incrementCurrentLessonIndex,
  setPoints,
  setLives,
  setProgress,
} = gameSlice.actions;

export default gameSlice.reducer;