'use client'

import { useState, useEffect, useRef } from 'react'
import LandingPage from '../components/LandingPage'
import PromptLibrary from '../components/PromptLibrary'

const PASSWORDS = {
  session1: '0421',
  session2: '0421',
}

const SESSION_LABELS = {
  session1: '실습 1 — Genspark PPT 제작',
  session2: '실습 2 — 바이브코딩 자동화',
}

const SESSION_COLORS = {
  session1: '#E8620A',
  session2: '#7C3AED',
}

function PasswordModal({ target, onSuccess, onClose }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORDS[target]) {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  const color = SESSION_COLORS[target]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{
          animation: 'modalIn 0.25s ease',
        }}
      >
        {/* 헤더 */}
        <div
          className="px-6 py-5 flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
            style={{ background: color }}
          >
            🔒
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{SESSION_LABELS[target]}</div>
            <div className="text-slate-500 text-xs mt-0.5">비밀번호를 입력해주세요</div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div
            style={{
              transform: shake ? 'translateX(0)' : 'translateX(0)',
              animation: shake ? 'shake 0.5s ease' : 'none',
            }}
          >
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
              style={{
                borderColor: error ? '#EF4444' : input ? color : '#E2E8F0',
                boxShadow: error
                  ? '0 0 0 3px #fee2e2'
                  : input
                  ? `0 0 0 3px ${color}22`
                  : 'none',
              }}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠️</span> 비밀번호가 올바르지 않습니다
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            입장하기 →
          </button>

          <p className="text-center text-slate-400 text-[11px] mt-3">
            숫자 4자리 · 강사에게 문의하세요
          </p>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%  { transform: translateX(-6px); }
          40%  { transform: translateX(6px); }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('landing')
  const [passwordModal, setPasswordModal] = useState(null)
  const [unlocked, setUnlocked] = useState({ session1: false, session2: false })

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('dw_unlocked')
      if (saved) setUnlocked(JSON.parse(saved))
    } catch {}
  }, [])

  const saveUnlocked = (next) => {
    setUnlocked(next)
    try { sessionStorage.setItem('dw_unlocked', JSON.stringify(next)) } catch {}
  }

  const tryGoSession = (session) => {
    if (unlocked[session]) {
      setView(session)
    } else {
      setPasswordModal(session)
    }
  }

  const handlePasswordSuccess = () => {
    const session = passwordModal
    const next = { ...unlocked, [session]: true }
    saveUnlocked(next)
    setPasswordModal(null)
    setView(session)
  }

  const handleSwitchSection = (targetSession) => {
    if (unlocked[targetSession]) {
      setView(targetSession)
    } else {
      setPasswordModal(targetSession)
    }
  }

  if (view === 'session1') {
    return (
      <>
        <PromptLibrary
          initialSection="session1"
          onBack={() => setView('landing')}
          onSwitchSection={handleSwitchSection}
        />
        {passwordModal && (
          <PasswordModal
            target={passwordModal}
            onSuccess={handlePasswordSuccess}
            onClose={() => setPasswordModal(null)}
          />
        )}
      </>
    )
  }
  if (view === 'session2') {
    return (
      <>
        <PromptLibrary
          initialSection="session2"
          onBack={() => setView('landing')}
          onSwitchSection={handleSwitchSection}
        />
        {passwordModal && (
          <PasswordModal
            target={passwordModal}
            onSuccess={handlePasswordSuccess}
            onClose={() => setPasswordModal(null)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <LandingPage
        onGoSession1={() => tryGoSession('session1')}
        onGoSession2={() => tryGoSession('session2')}
      />
      {passwordModal && (
        <PasswordModal
          target={passwordModal}
          onSuccess={handlePasswordSuccess}
          onClose={() => setPasswordModal(null)}
        />
      )}
    </>
  )
}
