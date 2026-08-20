// ---------------------------------------------------------------------------
// Mock data for the LearnQuest prototype. Everything here stands in for a
// real backend — it seeds localStorage on first run.
// ---------------------------------------------------------------------------

export const SUBJECTS = ['Mathematics', 'Science', 'English', 'General Knowledge', 'Technology']
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
export const TASK_TYPES = ['Quiz', 'Multiple Choice', 'Puzzle', 'Reading', 'Mathematics', 'Science', 'General Knowledge']
export const CLASSES = ['Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8']

export const initialStudents = [
  { id: 'STU001', name: 'Rahul Sharma', class: 'Class 6', tasksCompleted: 24, avgScore: 88, xp: 1240, level: 7, rank: 8, badge: 'Science Explorer', streak: 7, progress: 76 },
  { id: 'STU002', name: 'Ananya Patel', class: 'Class 7', tasksCompleted: 31, avgScore: 94, xp: 1810, level: 9, rank: 1, badge: 'Math Master', streak: 12, progress: 91 },
  { id: 'STU003', name: 'Aarav Kumar', class: 'Class 5', tasksCompleted: 18, avgScore: 79, xp: 940, level: 5, rank: 14, badge: 'First Step', streak: 3, progress: 58 },
  { id: 'STU004', name: 'Priya Singh', class: 'Class 6', tasksCompleted: 27, avgScore: 90, xp: 1520, level: 8, rank: 4, badge: 'Knowledge Hunter', streak: 9, progress: 83 },
  { id: 'STU005', name: 'Rohan Verma', class: 'Class 8', tasksCompleted: 22, avgScore: 82, xp: 1150, level: 6, rank: 10, badge: 'Fast Learner', streak: 5, progress: 69 },
  { id: 'STU006', name: 'Meera Iyer', class: 'Class 4', tasksCompleted: 15, avgScore: 85, xp: 820, level: 4, rank: 17, badge: 'First Step', streak: 2, progress: 47 },
  { id: 'STU007', name: 'Kabir Khan', class: 'Class 7', tasksCompleted: 29, avgScore: 91, xp: 1690, level: 9, rank: 2, badge: '7 Day Streak', streak: 14, progress: 88 },
  { id: 'STU008', name: 'Sneha Reddy', class: 'Class 5', tasksCompleted: 20, avgScore: 87, xp: 1080, level: 6, rank: 12, badge: 'Perfect Score', streak: 6, progress: 64 },
]

export const initialTasks = [
  { id: 'TSK001', title: 'Mathematics Challenge', description: 'Practice fractions, decimals and basic algebra through timed problem sets.', subject: 'Mathematics', difficulty: 'Medium', class: 'Class 6', estTime: 15, points: 120, dueDate: '2026-08-22', assignTo: 'Class 6', type: 'Mathematics', status: 'Active' },
  { id: 'TSK002', title: 'Science Explorer', description: 'Explore the solar system and answer questions about planets and gravity.', subject: 'Science', difficulty: 'Easy', class: 'Class 5', estTime: 10, points: 90, dueDate: '2026-08-20', assignTo: 'Class 5', type: 'Science', status: 'Active' },
  { id: 'TSK003', title: 'Vocabulary Quest', description: 'Build vocabulary through matching, synonyms and short reading passages.', subject: 'English', difficulty: 'Easy', class: 'Class 4', estTime: 12, points: 80, dueDate: '2026-08-18', assignTo: 'Class 4', type: 'Reading', status: 'Active' },
  { id: 'TSK004', title: 'GK Challenge', description: 'General knowledge quiz covering geography, history and current affairs.', subject: 'General Knowledge', difficulty: 'Medium', class: 'Class 7', estTime: 15, points: 110, dueDate: '2026-08-25', assignTo: 'Class 7', type: 'Quiz', status: 'Active' },
  { id: 'TSK005', title: 'Logical Reasoning', description: 'Pattern recognition and puzzle-solving to build reasoning skills.', subject: 'Mathematics', difficulty: 'Hard', class: 'Class 8', estTime: 20, points: 150, dueDate: '2026-08-28', assignTo: 'Class 8', type: 'Puzzle', status: 'Active' },
  { id: 'TSK006', title: 'Digital Literacy Basics', description: 'Understand safe internet use, basic devices and digital etiquette.', subject: 'Technology', difficulty: 'Easy', class: 'Class 6', estTime: 10, points: 70, dueDate: '2026-08-19', assignTo: 'Class 6', type: 'Multiple Choice', status: 'Completed' },
]

export const initialTests = [
  { id: 'TST001', name: 'Mid-Term Mathematics', subject: 'Mathematics', class: 'Class 6', questions: 20, duration: 40, assigned: 32, status: 'Scheduled' },
  { id: 'TST002', name: 'Science Unit Test', subject: 'Science', class: 'Class 5', questions: 15, duration: 30, assigned: 28, status: 'Live' },
  { id: 'TST003', name: 'English Grammar Test', subject: 'English', class: 'Class 4', questions: 18, duration: 35, assigned: 25, status: 'Completed' },
]

export const initialGames = [
  { id: 'GAM001', title: 'Math Sprint', description: 'Race against the clock solving arithmetic problems.', difficulty: 'Medium', points: 100, badge: 'Math Master', timeLimit: 5, xp: 80 },
  { id: 'GAM002', title: 'Science Explorer', description: 'Discover facts about nature, space and the human body.', difficulty: 'Easy', points: 90, badge: 'Science Explorer', timeLimit: 8, xp: 70 },
  { id: 'GAM003', title: 'Vocabulary Quest', description: 'Match words to meanings in a fast-paced word game.', difficulty: 'Easy', points: 80, badge: 'Fast Learner', timeLimit: 6, xp: 60 },
  { id: 'GAM004', title: 'GK Challenge', description: 'Test general knowledge across categories in rapid rounds.', difficulty: 'Hard', points: 130, badge: 'Knowledge Hunter', timeLimit: 10, xp: 110 },
]

export const badgeCatalog = [
  { id: 'first-step', name: 'First Step', description: 'Complete your very first task', icon: 'Footprints' },
  { id: 'fast-learner', name: 'Fast Learner', description: 'Finish a task in under half the estimated time', icon: 'Zap' },
  { id: 'science-explorer', name: 'Science Explorer', description: 'Score 85%+ on 3 Science tasks', icon: 'Rocket' },
  { id: 'math-master', name: 'Math Master', description: 'Score 90%+ on 5 Mathematics tasks', icon: 'Sigma' },
  { id: 'streak-7', name: '7 Day Streak', description: 'Learn for 7 days in a row', icon: 'Flame' },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% on any task', icon: 'Star' },
  { id: 'knowledge-hunter', name: 'Knowledge Hunter', description: 'Complete 25 tasks across all subjects', icon: 'Compass' },
]

export const activityFeed = [
  { id: 1, text: 'Rahul completed Mathematics Challenge', time: '10 min ago' },
  { id: 2, text: 'Ananya earned a Gold Badge', time: '32 min ago' },
  { id: 3, text: 'Class 6 completed Science Quiz', time: '1 hr ago' },
  { id: 4, text: 'New task assigned to Class 7', time: '2 hr ago' },
  { id: 5, text: 'Kabir reached a 14 day streak', time: '3 hr ago' },
]

export const weeklyActivity = [
  { day: 'Mon', tasks: 42 }, { day: 'Tue', tasks: 55 }, { day: 'Wed', tasks: 38 },
  { day: 'Thu', tasks: 61 }, { day: 'Fri', tasks: 47 }, { day: 'Sat', tasks: 29 }, { day: 'Sun', tasks: 18 },
]

export const subjectCompletion = [
  { subject: 'Mathematics', value: 88 },
  { subject: 'Science', value: 74 },
  { subject: 'English', value: 81 },
  { subject: 'GK', value: 65 },
  { subject: 'Technology', value: 58 },
]

// --- Question banks used to power the interactive student/candidate tasks ---
export const questionBank = {
  Mathematics: [
    { q: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 1, note: 'placeholder-mixed-in for variety' },
    { q: 'What is 7 × 8?', options: ['54', '56', '64', '48'], answer: 1 },
    { q: 'What is the value of π (pi), rounded to 2 decimals?', options: ['3.14', '3.41', '3.12', '2.14'], answer: 0 },
    { q: 'Simplify: 3/4 + 1/4', options: ['1', '4/8', '3/8', '1/2'], answer: 0 },
    { q: 'What is the next number: 2, 4, 8, 16, ?', options: ['20', '24', '32', '18'], answer: 2 },
  ],
  Science: [
    { q: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 1 },
    { q: 'What gas do plants absorb from the air?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 2 },
    { q: 'How many bones are in the adult human body?', options: ['206', '186', '226', '196'], answer: 0 },
    { q: 'What is the boiling point of water at sea level?', options: ['90°C', '100°C', '80°C', '110°C'], answer: 1 },
    { q: 'Which organ pumps blood through the body?', options: ['Lungs', 'Liver', 'Heart', 'Kidney'], answer: 2 },
  ],
  English: [
    { q: 'Choose the synonym of "Happy".', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 1 },
    { q: 'Which word is a noun?', options: ['Run', 'Quickly', 'Table', 'Blue'], answer: 2 },
    { q: 'What is the plural of "Child"?', options: ['Childs', 'Children', 'Childes', 'Childrens'], answer: 1 },
    { q: 'Choose the correctly spelled word.', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], answer: 1 },
    { q: 'Which is an antonym of "Brave"?', options: ['Bold', 'Fearless', 'Coward', 'Strong'], answer: 2 },
  ],
  'General Knowledge': [
    { q: 'What is the capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], answer: 1 },
    { q: 'Which is the longest river in the world?', options: ['Ganga', 'Amazon', 'Nile', 'Yangtze'], answer: 2 },
    { q: 'Who wrote the Indian national anthem?', options: ['Rabindranath Tagore', 'Bankim Chandra', 'Sarojini Naidu', 'Munshi Premchand'], answer: 0 },
    { q: 'How many continents are there?', options: ['5', '6', '7', '8'], answer: 2 },
    { q: 'Which is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'Malta', 'San Marino'], answer: 1 },
  ],
  Technology: [
    { q: 'What does "AI" stand for?', options: ['Automated Input', 'Artificial Intelligence', 'Applied Internet', 'Auto Index'], answer: 1 },
    { q: 'Which of these is used to browse the internet?', options: ['Excel', 'Browser', 'Compiler', 'Notepad'], answer: 1 },
    { q: 'What should you never share online with strangers?', options: ['Favourite colour', 'Home address', 'Favourite movie', 'Hobby'], answer: 1 },
    { q: 'What is a strong password most likely to include?', options: ['Your name only', 'A mix of letters, numbers, symbols', 'Just numbers', 'The word "password"'], answer: 1 },
    { q: 'What does "www" stand for?', options: ['World Wide Web', 'Web Wide World', 'World Web Wide', 'Wide World Web'], answer: 0 },
  ],
}

// --- Candidate age-based personalization ------------------------------------
export const ageGroups = [
  {
    id: '5-12',
    label: 'Explorer',
    range: '5–12',
    tagline: 'Fun, visual and interactive learning.',
    categories: ['General Knowledge', 'Basic Mathematics', 'Science Explorer', 'Language & Vocabulary', 'Creative Thinking'],
  },
  {
    id: '12-17',
    label: 'Young Achiever',
    range: '12–17',
    tagline: 'Build knowledge, skills and confidence.',
    categories: ['General Knowledge', 'Technology', 'Mathematics', 'Science', 'Communication', 'Logical Reasoning', 'Current Affairs'],
  },
  {
    id: '17+',
    label: 'Lifelong Learner',
    range: '17+',
    tagline: 'Develop practical knowledge and career-ready skills.',
    categories: ['Technology', 'Career Skills', 'Financial Literacy', 'General Knowledge', 'Communication', 'Critical Thinking', 'Entrepreneurship'],
  },
]

// maps a candidate category label to a subject key with a question bank
export function categoryToSubject(category) {
  const map = {
    'Basic Mathematics': 'Mathematics',
    Mathematics: 'Mathematics',
    'Science Explorer': 'Science',
    Science: 'Science',
    'Language & Vocabulary': 'English',
    Communication: 'English',
    'General Knowledge': 'General Knowledge',
    'Current Affairs': 'General Knowledge',
    Technology: 'Technology',
    'Career Skills': 'Technology',
    'Financial Literacy': 'General Knowledge',
    'Critical Thinking': 'General Knowledge',
    Entrepreneurship: 'Technology',
    'Creative Thinking': 'English',
    'Logical Reasoning': 'Mathematics',
  }
  return map[category] || 'General Knowledge'
}

// --- Bubble Pop Math Game: rounds of quick arithmetic with floating answer bubbles ---
export const mathBubbleBank = [
  { question: '7 + 8', answer: 15, distractors: [13, 16, 14] },
  { question: '9 × 6', answer: 54, distractors: [45, 56, 48] },
  { question: '12 − 5', answer: 7, distractors: [6, 8, 9] },
  { question: '36 ÷ 4', answer: 9, distractors: [8, 6, 12] },
  { question: '15 + 27', answer: 42, distractors: [41, 43, 38] },
  { question: '8 × 7', answer: 56, distractors: [54, 64, 48] },
  { question: '100 − 37', answer: 63, distractors: [67, 73, 53] },
  { question: '13 × 3', answer: 39, distractors: [36, 42, 33] },
  { question: '81 ÷ 9', answer: 9, distractors: [8, 7, 11] },
  { question: '25 + 46', answer: 71, distractors: [61, 76, 69] },
]

// --- Word Puzzle Game: unscramble the word using letter tiles ---
export const wordPuzzleBank = [
  { word: 'PLANET', hint: 'Earth is one of these' },
  { word: 'SCIENCE', hint: 'The study of the natural world' },
  { word: 'GARDEN', hint: 'A place where plants grow' },
  { word: 'RIVER', hint: 'Flowing body of water' },
  { word: 'MARKET', hint: 'A place to buy and sell goods' },
  { word: 'FOREST', hint: 'A large area covered in trees' },
  { word: 'ROCKET', hint: 'Used to travel to space' },
  { word: 'ANIMAL', hint: 'A living creature, not a plant' },
  { word: 'NUMBER', hint: 'Used for counting' },
  { word: 'FRIEND', hint: 'Someone you trust and enjoy being with' },
  { word: 'SEASON', hint: 'Summer, winter, spring or autumn' },
  { word: 'VILLAGE', hint: 'A small rural settlement' },
]

// Maps a task/category to the game experience used to complete it.
// 'bubble' = floating math bubbles, 'word' = letter-tile word puzzle, 'quiz' = MCQ
export function taskTypeToGame(type) {
  if (type === 'Mathematics') return 'bubble'
  if (type === 'Puzzle' || type === 'Reading') return 'word'
  return 'quiz'
}

export function categoryToGame(category) {
  const bubbleCats = ['Basic Mathematics', 'Mathematics', 'Logical Reasoning', 'Financial Literacy']
  const wordCats = ['Language & Vocabulary', 'Communication', 'Creative Thinking']
  if (bubbleCats.includes(category)) return 'bubble'
  if (wordCats.includes(category)) return 'word'
  return 'quiz'
}

export const parentInsights = [
  'Your child is strongest in Mathematics.',
  'Science performance has improved by 18% this month.',
  'The child performs best during evening learning sessions.',
]

export const leaderboardData = initialStudents
  .map((s) => ({ name: s.name, xp: s.xp, tasksCompleted: s.tasksCompleted, score: s.avgScore, rank: s.rank }))
  .sort((a, b) => a.rank - b.rank)
