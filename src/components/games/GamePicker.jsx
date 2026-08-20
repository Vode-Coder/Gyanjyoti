import React from 'react'
import QuizRunner from '../QuizRunner'
import BubbleMathGame from './BubbleMathGame'
import WordPuzzleGame from './WordPuzzleGame'

// Renders the right mini-game experience for a task based on its game type,
// so "completing a task" isn't always the same MCQ flow.
export default function GamePicker({ gameType, questions, meta, onFinish }) {
  if (gameType === 'bubble') return <BubbleMathGame meta={meta} onFinish={onFinish} />
  if (gameType === 'word') return <WordPuzzleGame meta={meta} onFinish={onFinish} />
  return <QuizRunner questions={questions} meta={meta} onFinish={onFinish} />
}
