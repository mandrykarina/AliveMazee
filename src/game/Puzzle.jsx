import React, { useMemo, useState } from 'react'

const PROG_QUESTIONS = [
  { q: 'Какой оператор в C++ используется для выделения памяти?', a: 'new' },
  { q: 'Как объявить целочисленную переменную в Python?', a: 'int' },
  { q: 'Что выведет print(2 ** 3) в Python?', a: '8' },
  { q: 'Какой тип данных в C++ для символа?', a: 'char' },
  { q: 'Как создать пустой список в Python?', a: '[]' },
  { q: 'Что означает ++ в C++?', a: 'инкремент' },
  { q: 'Какой оператор в Python проверяет тип данных?', a: 'type' },
  { q: 'Как объявить константу в C++?', a: 'const' },
  { q: 'Какой метод добавляет элемент в список Python?', a: 'append' },
  { q: 'Что такое указатель в C++?', a: 'pointer' },
  { q: 'Какой оператор вывода в C++?', a: 'cout' },
  { q: 'Как называется функция в Python для ввода данных?', a: 'input' }
]

const LOGIC_QUESTIONS = [
  { q: 'Что идет следующим в последовательности: 1, 1, 2, 3, 5, 8?', a: '13' },
  { q: 'У отца Мэри есть пять дочерей: 1. Чача 2. Чече 3. Чичи 4. Чочо. Как зовут пятую дочь?', a: 'мэри' },
  { q: 'Что можно сломать, даже если никогда не брал в руки?', a: 'обещание' },
  { q: 'Я легок как перо, но меня нельзя долго удерживать. Что я?', a: 'дыхание' },
  { q: 'Что принадлежит тебе, но другие используют это чаще?', a: 'имя' },
  { q: 'Что имеет глаза, но не видит?', a: 'игла' },
  { q: 'Чем больше из меня берешь, тем больше я становлюсь. Что я?', a: 'яма' }
]

export default function Puzzle({ wallMeta, onSolved, onClose, level }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  
  const qset = wallMeta.type === 'prog' ? PROG_QUESTIONS : LOGIC_QUESTIONS
  
  const q = useMemo(() => {
    return qset[Math.floor(Math.random() * qset.length)]
  }, [wallMeta.type])

  function handleSubmit() {
    const userAnswer = answer.trim().toLowerCase()
    const correctAnswer = q.a.toLowerCase()
    
    if (userAnswer === correctAnswer) {
      setFeedback('✓ Правильно!')
      setTimeout(() => {
        onSolved()
      }, 600)
    } else {
      setFeedback('✗ Неправильно! Попробуй ещё раз.')
      setAnswer('')
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="puzzle-overlay">
      <div className="puzzle-content">
        <button className="puzzle-close" onClick={onClose}>✕</button>
        
        <h3>
          {wallMeta.type === 'prog' ? '💻 ПРОГРАММИРОВАНИЕ' : '🧠 ЛОГИКА'}
        </h3>
        
        <div className="puzzle-question">
          {q.q}
        </div>

        <input
          className="puzzle-input"
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
            setFeedback('')
          }}
          onKeyPress={handleKeyPress}
          placeholder="Введи ответ..."
          autoFocus
        />

        {feedback && (
          <div className={`puzzle-feedback ${feedback.includes('✓') ? 'success' : 'error'}`}>
            {feedback}
          </div>
        )}

        <div className="puzzle-controls">
          <button onClick={handleSubmit}>
            Проверить
          </button>
        </div>
      </div>
    </div>
  )
}
