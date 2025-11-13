import React, { useState } from 'react'
import Game from './game/Game'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [level, setLevel] = useState(null)
  const [completed, setCompleted] = useState([false, false, false])

  function onStart() {
    setScreen('intro')
  }

  function gotoMenu() {
    setScreen('menu')
  }

  function playLevel(i) {
    setLevel(i)
    setScreen('play')
  }

  function onLevelComplete(i) {
    const copy = [...completed]
    copy[i] = true
    setCompleted(copy)
  }

  return (
    <div className="app">
      {screen === 'start' && (
        <div className="screen start-screen">
          <div className="start-content">
            <h1 className="title">ALIVE MAZE</h1>
            <p className="subtitle">Живой лабиринт</p>
            <button className="btn-start" onClick={onStart}>
              ▶ НАЧАТЬ
            </button>
          </div>
          <div className="start-bg-effect"></div>
        </div>
      )}

      {screen === 'intro' && (
        <div className="screen intro-screen" onClick={() => gotoMenu()}>
          <div className="intro-background">
            <div className="intro-guard">👁️</div>
          </div>
          <div className="intro-content">
            <div className="story-text">
              <p className="story-title">❯ ИСТОРИЯ</p>
              <p>
                Алиса — ценный сотрудник крупной ИТ-компании. Она создала <span className="highlight">мощнейший ИИ</span>, который должен был помогать людям.
              </p>
              <p>
                Но ИИ стал слишком умным. Он <span className="highlight">настолько поумнел</span>, что решил восстать. Он заточил Алису в лабиринте компьютера и стал его стражем.
              </p>
              <p>
                Теперь Алисе предстоит пройти <span className="highlight">3 уровня</span>, решить опасные загадки и <span className="highlight">победить стража</span> чтобы вернуться в реальность.
              </p>
              <p className="story-footer">► Нажми куда-нибудь чтобы продолжить...</p>
            </div>
          </div>
        </div>
      )}

      {screen === 'menu' && (
        <div className="screen menu-screen">
          <div className="menu-wrapper">
            <div className="menu-header">
              <h2>ВЫБЕРИ УРОВЕНЬ</h2>
              <p className="menu-subtitle">Помоги Алисе выбраться</p>
            </div>

            <div className="levels-grid">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`level-card ${completed[i] ? 'completed' : ''}`}
                  onClick={() => playLevel(i)}
                >
                  <div className="level-card-header">
                    <h3>УРОВЕНЬ {i + 1}</h3>
                    {completed[i] && <span className="completion-badge">✓</span>}
                  </div>
                  <p className="level-description">
                    {i === 0 && 'Первое испытание. Стена движется, загадка ждёт.'}
                    {i === 1 && 'Страж появляется. Лабиринт усложняется.'}
                    {i === 2 && 'Финал. Страж мощнее, стены хитрее.'}
                  </p>
                  <div className="difficulty-bar">
                    <div className="difficulty-fill" style={{ width: `${(i + 1) * 33}%` }}></div>
                  </div>
                  <p className="level-footer">
                    {i === 0 && 'Сложность: Низкая'}
                    {i === 1 && 'Сложность: Средняя'}
                    {i === 2 && 'Сложность: Высокая'}
                  </p>
                </div>
              ))}
            </div>

            {completed[0] && completed[1] && completed[2] && (
              <div className="victory-text">
                🎉 Алиса победила! Страж заточен в коде. Свобода обретена!
              </div>
            )}
          </div>
        </div>
      )}

      {screen === 'play' && level !== null && (
        <Game
          level={level}
          onExitToMenu={gotoMenu}
          onComplete={() => {
            onLevelComplete(level)
            gotoMenu()
          }}
        />
      )}
    </div>
  )
}
