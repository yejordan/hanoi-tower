import React from 'react';

interface HanoiVisualizationProps {
  rods: number[][];
  diskCount: number;
}

export const HanoiVisualization: React.FC<HanoiVisualizationProps> = ({ rods, diskCount }) => {
  // 计算圆盘的宽度（基于圆盘大小）
  const getDiskWidth = (diskSize: number) => {
    return 50 + (diskSize - 1) * 35;
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

  const rodHeight = 280;
  const baseHeight = 24;
  const diskHeight = 36;
  const maxDisks = diskCount;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 sm:p-8">
      {/* 动画区域 */}
      <div className="relative w-full bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl shadow-lg overflow-hidden">
        {/* 三个塔的容器 */}
        <div className="flex justify-around items-end px-4 sm:px-8 py-12 sm:py-16" style={{ minHeight: '420px' }}>
          {rods.map((rod, rodIndex) => (
            <div key={rodIndex} className="flex flex-col items-center relative" style={{ width: '120px' }}>
              {/* 柱子和圆盘的容器 - 绝对定位 */}
              <div className="relative w-full" style={{ height: `${rodHeight}px` }}>
                {/* 柱子 - 从上到下贯穿整个区域 */}
                <div
                  className="hanoi-rod absolute left-1/2 transform -translate-x-1/2 top-0"
                  style={{
                    width: '10px',
                    height: `${rodHeight}px`,
                    zIndex: 1
                  }}
                />

                {/* 圆盘堆积区域 - 从底部开始堆积 */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 flex flex-col-reverse gap-0"
                  style={{
                    bottom: `${baseHeight + 4}px`,
                    zIndex: 2
                  }}
                >
                  {rod.map((diskSize, diskIndex) => (
                    <div
                      key={`${rodIndex}-${diskIndex}`}
                      className={`hanoi-disk bg-gradient-to-r ${getDiskColor(diskSize)} flex items-center justify-center text-white font-bold text-xs sm:text-sm transition-all duration-500 ease-out`}
                      style={{
                        width: `${getDiskWidth(diskSize)}px`,
                        height: `${diskHeight}px`,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        animation: `fadeInUp 0.5s ease-out ${diskIndex * 0.1}s both`
                      }}
                    >
                      {diskSize}
                    </div>
                  ))}
                </div>
              </div>

              {/* 底座 */}
              <div
                className="hanoi-base relative"
                style={{
                  width: '140px',
                  height: `${baseHeight}px`,
                  zIndex: 3
                }}
              />

              {/* 塔的标签 */}
              <div className="mt-4 text-center">
                <p className="text-sm sm:text-base font-semibold text-slate-700">
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

      {/* 动画定义 */}
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
