import { HanoiVisualization } from '@/components/HanoiVisualization';
import { HanoiControls } from '@/components/HanoiControls';
import { useHanoiTower } from '@/hooks/useHanoiTower';

/**
 * 汉诺塔动画展示页面
 * 
 * 设计理念：现代极简主义 + 交互艺术
 * - 深蓝色主色调 + 紫色渐变圆盘
 * - 流畅的弹性动画
 * - 响应式设计，完美适配手机
 */
export default function Home() {
  const hanoi = useHanoiTower(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 sm:py-12">
      {/* 页面容器 */}
      <div className="container mx-auto max-w-4xl px-4">
        {/* 标题区域 */}
        <div className="text-center mb-12 sm:mb-16 fade-in-up" style={{ animationDelay: '0s' }}>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            汉诺塔
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            经典递归算法的动画演示
          </p>
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-8 sm:space-y-12">
          {/* 可视化区域 */}
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <HanoiVisualization 
              rods={hanoi.rods} 
              diskCount={hanoi.diskCount}
            />
          </div>

          {/* 控制面板 */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <HanoiControls
              diskCount={hanoi.diskCount}
              onDiskCountChange={hanoi.changeDiskCount}
              isPlaying={hanoi.isPlaying}
              onPlayToggle={hanoi.togglePlayback}
              onPrevious={hanoi.previousMove}
              onNext={hanoi.nextMove}
              onReset={hanoi.reset}
              currentMoveIndex={hanoi.currentMoveIndex}
              totalMoves={hanoi.totalMoves}
              progress={hanoi.progress}
            />
          </div>

          {/* 底部说明 */}
          <div className="mt-12 sm:mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
              📚 关于汉诺塔
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                <strong>汉诺塔</strong>（Tower of Hanoi）是一个经典的递归算法问题，由法国数学家爱德华·卢卡斯在 1883 年提出。
              </p>
              <p>
                <strong>规则：</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>有三个塔（A、B、C）和 N 个大小不同的圆盘</li>
                <li>初始状态下，所有圆盘都在塔 A 上，按大小从下到上排列</li>
                <li>目标是将所有圆盘移到塔 C</li>
                <li>每次只能移动一个圆盘</li>
                <li>大圆盘不能放在小圆盘上方</li>
              </ul>
              <p>
                <strong>算法复杂度：</strong>移动 N 个圆盘需要 2^N - 1 次移动。例如：3 个圆盘需要 7 次，4 个需要 15 次。
              </p>
              <p>
                <strong>递归思想：</strong>要将 N 个圆盘从 A 移到 C，可以分为三个步骤：
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>将 N-1 个圆盘从 A 移到 B（以 C 为辅助）</li>
                <li>将第 N 个圆盘从 A 移到 C</li>
                <li>将 N-1 个圆盘从 B 移到 C（以 A 为辅助）</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <div className="text-center mt-12 sm:mt-16 text-xs sm:text-sm text-slate-500">
        <p>使用 React + TailwindCSS 构建 • 响应式设计，完美适配手机</p>
      </div>
    </div>
  );
}
