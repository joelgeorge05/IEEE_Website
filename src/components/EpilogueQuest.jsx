import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  CheckCircle2, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, PERKS_DATA } from '../data/quizData';
import { soundFx } from '../utils/soundEffects';

export default function EpilogueQuest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (index) => {
    if (isSubmitted) return;
    soundFx.playClick();
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    const q = QUIZ_QUESTIONS[currentQuestion];
    if (selectedOption === q.correct) {
      soundFx.playSuccess();
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      soundFx.playSuccess();
      triggerConfetti();
    }
  };

  const handleRestartQuiz = () => {
    soundFx.playClick();
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00629B', '#00D2FF', '#F59E0B', '#10B981']
      });
    } catch (e) {}
  };

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <section id="epilogue" className="py-24 relative border-b border-ieee-border/50 bg-slate-950/50">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-14 2xl:pr-8 relative z-10">
        
        {/* Chapter Header */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ieee-cyan block mb-1">
            Epilogue 07 // The Next Frontier
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Begin Your Quest
          </h2>
        </div>

        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-12 font-light leading-relaxed">
          The next chapter of IEEE Computer Society MBITS isn't written yet. It begins with your curiosity, your commits, and your creations.
        </p>

        {/* Two-Column Grid: Membership Perks & Interactive Knowledge Quest */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Why Join / Perks */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-ieee-border h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Why Join IEEE Computer Society MBITS?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  As a student branch chapter member, you gain worldwide credentials and direct access to state-of-the-art resources.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PERKS_DATA.map((perk, index) => {
                    return (
                      <div key={perk.title} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 border-l-2 border-l-ieee-cyan hover:border-slate-700 transition-all flex flex-col justify-center">
                        <div className="text-[10px] font-mono text-ieee-cyan font-semibold mb-1">
                          PERK 0{index + 1}
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{perk.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">{perk.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Membership CTA */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-ieee-cyan font-semibold">IEEE Chapter Membership</div>
                  <div className="text-[11px] text-slate-400">Open to all B.Tech / M.Tech students at MBITS</div>
                </div>
                <a
                  href="#contact"
                  onClick={() => soundFx.playClick()}
                  className="group relative p-[1px] rounded-xl overflow-hidden focus:outline-none transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(0,210,255,0.25)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] whitespace-nowrap"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-ieee-blue via-ieee-cyan to-sky-400 group-hover:from-ieee-cyan group-hover:via-white group-hover:to-sky-400 transition-all duration-500 opacity-90 group-hover:opacity-100" />
                  <span className="relative px-5 py-2 rounded-[11px] bg-slate-950/90 group-hover:bg-slate-900/80 backdrop-blur flex items-center gap-2.5 transition-colors duration-300">
                    <span className="font-semibold text-xs tracking-wide text-white group-hover:text-cyan-200 transition-colors">
                      Join Chapter Now
                    </span>
                    <span className="w-5 h-5 rounded-md bg-ieee-cyan/15 text-ieee-cyan flex items-center justify-center group-hover:bg-ieee-cyan group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Knowledge Quest Mini-Game */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-slate-900/95 border border-ieee-cyan/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-ieee-cyan/5 blur-2xl rounded-full pointer-events-none" />

              {!quizFinished ? (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-mono text-ieee-cyan tracking-wider">
                        // CS & IEEE KNOWLEDGE QUEST
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                      </span>
                    </div>

                    {/* Question */}
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 min-h-[50px] leading-snug">
                      {q.question}
                    </h4>
                    <div className="text-xs text-slate-400 mb-5 font-mono flex items-center gap-1.5">
                      <span>💡</span>
                      <span>Hint: {q.hint}</span>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      {q.options.map((option, idx) => {
                        let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                        if (selectedOption === idx) {
                          btnStyle = 'bg-ieee-blue/20 border-ieee-cyan text-white ring-1 ring-ieee-cyan shadow-[0_0_15px_rgba(0,210,255,0.15)]';
                        }
                        if (isSubmitted) {
                          if (idx === q.correct) {
                            btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold';
                          } else if (selectedOption === idx) {
                            btnStyle = 'bg-red-950/60 border-red-500 text-red-300';
                          }
                        }

                        return (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {isSubmitted && idx === q.correct && (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {isSubmitted && selectedOption === idx && idx !== q.correct && (
                              <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit / Next Button Bar */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="text-xs font-mono text-slate-400">
                      Score: <span className="text-ieee-cyan font-bold text-sm">{score}</span> / {QUIZ_QUESTIONS.length}
                    </div>

                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-ieee-blue hover:bg-ieee-lightBlue text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,98,155,0.3)]"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-lg transition-all"
                      >
                        {currentQuestion + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'Complete Quest 🏆'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quest Complete Achievement Card */
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="text-center my-auto space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ieee-blue to-ieee-cyan flex items-center justify-center text-white mx-auto shadow-[0_0_30px_rgba(0,210,255,0.5)]">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-mono text-ieee-cyan uppercase tracking-wider">
                        Badge Unlocked!
                      </div>
                      <h4 className="text-2xl font-bold font-display text-white">
                        Verified MBITS Quest Master
                      </h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto">
                        You achieved a score of <strong>{score} / {QUIZ_QUESTIONS.length}</strong>! You possess the technical awareness suited for an IEEE Computer Society pioneer.
                      </p>
                    </div>

                    {/* Digital Badge Box */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-ieee-cyan/40 max-w-xs mx-auto text-left font-mono text-xs text-slate-300 space-y-1">
                      <div className="text-ieee-cyan font-bold">CERTIFICATE ID: #MBITS-CS-2026</div>
                      <div>STATUS: ACCOMPLISHED</div>
                      <div>TIMESTAMP: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex justify-center gap-3">
                    <button
                      onClick={handleRestartQuiz}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retry Quest
                    </button>
                    <a
                      href="#contact"
                      onClick={() => soundFx.playClick()}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-ieee-blue to-ieee-cyan text-white shadow-md transition-all"
                    >
                      Claim Chapter Membership
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
