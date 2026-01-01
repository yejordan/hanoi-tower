import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface HanoiControlsProps {
  diskCount: number;
  onDiskCountChange: (count: number) => void;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  currentMoveIndex: number;
  totalMoves: number;
  progress: number;
}

export const HanoiControls: React.FC<HanoiControlsProps> = ({
  diskCount,
  onDiskCountChange,
  isPlaying,
  onPlayToggle,
  onPrevious,
  onNext,
  onReset,
  currentMoveIndex,
  totalMoves,
  progress
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-8">
      {/* 玻璃态控制面板 */}
      <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* 圆盘数量选择 */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            圆盘数量
          </label>
          <div className="flex gap-2 sm:gap-3">
            {[3, 4, 5, 6, 7].map(count => (
              <button
                key={count}
                onClick={() => onDiskCountChange(count)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                  diskCount === count
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-700">
              进度
            </label>
            <span className="text-sm font-mono text-slate-600">
              {currentMoveIndex} / {totalMoves}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 播放控制按钮 */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 justify-center">
          <button
            onClick={onPrevious}
            disabled={currentMoveIndex === 0}
            className="button-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
          >
            <SkipBack size={18} />
            <span className="hidden sm:inline">上一步</span>
          </button>

          <button
            onClick={onPlayToggle}
            className="button-primary flex items-center gap-2 text-sm sm:text-base"
          >
            {isPlaying ? (
              <>
                <Pause size={18} />
                <span className="hidden sm:inline">暂停</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span className="hidden sm:inline">播放</span>
              </>
            )}
          </button>

          <button
            onClick={onNext}
            disabled={currentMoveIndex >= totalMoves}
            className="button-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">下一步</span>
            <SkipForward size={18} />
          </button>

          <button
            onClick={onReset}
            className="button-danger flex items-center gap-2 text-sm sm:text-base"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">重置</span>
          </button>
        </div>

        {/* 信息提示 */}
        <div className="text-center">
          {currentMoveIndex >= totalMoves && totalMoves > 0 ? (
            <div className="text-green-600 font-semibold text-sm sm:text-base animate-pulse">
              ✓ 完成！所有圆盘已成功移到第三个塔
            </div>
          ) : (
            <div className="text-slate-600 text-xs sm:text-sm">
              {isPlaying ? '正在自动播放...' : '点击播放开始动画演示'}
            </div>
          )}
        </div>
      </div>

      {/* 说明文本 */}
      <div className="mt-8 text-center">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          汉诺塔是一个经典的递归算法问题。目标是将所有圆盘从塔 A 移到塔 C，
          <br className="hidden sm:inline" />
          每次只能移动一个圆盘，且大圆盘不能放在小圆盘上方。
        </p>
      </div>
    </div>
  );
};
