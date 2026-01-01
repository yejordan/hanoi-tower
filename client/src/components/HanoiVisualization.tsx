import React, { useMemo } from 'react';

interface HanoiVisualizationProps {
  rods: number[][];
  diskCount: number;
}

export const HanoiVisualization: React.FC<HanoiVisualizationProps> = ({ rods, diskCount }) => {
  // 计算圆盘的宽度（基于圆盘大小）
  const getDiskWidth = (diskSize: number) => {
    return 40 + (diskSize - 1) * 30;
  };

  // 获取圆盘的颜色（基于大小）
  const getDiskColor = (diskSize: number) => {
    const colors = [
      'from-purple-400 to-pink-400',
      'from-purple-500 to-pink-500',
      'from-purple-600 to-pink-600',
      'from-purple-700 to-pink-700',
      'from-purple-800 to-pink-800',
      'from-purple-900 to-pink-900',
      'from-indigo-900 to-purple-900',
      'from-indigo-950 to-purple-950'
    ];
    return colors[Math.min(diskSize - 1, colors.length - 1)];
  };

  const rodHeight = 240;
  const baseHeight = 20;
  const baseWidth = 320;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 sm:p-8">
      {/* 动画区域 */}
      <div className="relative w-full bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl p-8 sm:p-12 shadow-lg mb-8">
        {/* 三个塔 */}
        <div className="flex justify-between items-end h-80">
          {rods.map((rod, rodIndex) => (
            <div key={rodIndex} className="flex flex-col items-center">
              {/* 塔杆 */}
              <div className="relative flex flex-col items-center justify-end" style={{ height: `${rodHeight}px` }}>
                {/* 圆盘堆积区域 */}
                <div className="flex flex-col-reverse gap-1 mb-2">
                  {rod.map((diskSize, diskIndex) => (
                    <div
                      key={`${rodIndex}-${diskIndex}`}
                      className={`hanoi-disk bg-gradient-to-r ${getDiskColor(diskSize)} flex items-center justify-center text-white font-bold text-sm sm:text-base transition-all duration-500 ease-out`}
                      style={{
                        width: `${getDiskWidth(diskSize)}px`,
                        height: '32px',
                        animation: `fadeInUp 0.5s ease-out ${diskIndex * 0.1}s both`
                      }}
                    >
                      {diskSize}
                    </div>
                  ))}
                </div>

                {/* 塔杆 */}
                <div
                  className="hanoi-rod"
                  style={{
                    width: '8px',
                    height: `${rodHeight - 40}px`,
                    marginBottom: '8px'
                  }}
                />
              </div>

              {/* 底座 */}
              <div
                className="hanoi-base"
                style={{
                  width: `${baseWidth / 3}px`,
                  height: `${baseHeight}px`
                }}
              />

              {/* 塔的标签 */}
              <div className="mt-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {['A', 'B', 'C'][rodIndex]}
                </p>
                <p className="text-xs text-slate-500">
                  {rod.length} 个
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 进度指示 */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
