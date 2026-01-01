import { useState, useCallback, useEffect } from 'react';

export interface Move {
  from: number;
  to: number;
  disk: number;
}

export interface HanoiState {
  rods: number[][];
  moves: Move[];
  currentMoveIndex: number;
  isPlaying: boolean;
  diskCount: number;
  totalMoves: number;
}

export const useHanoiTower = (initialDiskCount: number = 3) => {
  const [state, setState] = useState<HanoiState>(() => {
    const rods = [
      Array.from({ length: initialDiskCount }, (_, i) => initialDiskCount - i),
      [],
      []
    ];
    return {
      rods,
      moves: [],
      currentMoveIndex: 0,
      isPlaying: false,
      diskCount: initialDiskCount,
      totalMoves: Math.pow(2, initialDiskCount) - 1
    };
  });

  // 生成汉诺塔的所有移动步骤
  const generateMoves = useCallback((n: number, source: number, target: number, auxiliary: number): Move[] => {
    if (n === 0) return [];
    
    const moves: Move[] = [];
    
    // 将 n-1 个圆盘从 source 移到 auxiliary
    moves.push(...generateMoves(n - 1, source, auxiliary, target));
    
    // 将第 n 个圆盘从 source 移到 target
    moves.push({ from: source, to: target, disk: n });
    
    // 将 n-1 个圆盘从 auxiliary 移到 target
    moves.push(...generateMoves(n - 1, auxiliary, target, source));
    
    return moves;
  }, []);

  // 初始化游戏
  const initializeGame = useCallback((diskCount: number) => {
    const rods = [
      Array.from({ length: diskCount }, (_, i) => diskCount - i),
      [],
      []
    ];
    const moves = generateMoves(diskCount, 0, 2, 1);
    
    setState({
      rods,
      moves,
      currentMoveIndex: 0,
      isPlaying: false,
      diskCount,
      totalMoves: moves.length
    });
  }, [generateMoves]);

  // 执行单个移动
  const executeMove = useCallback((move: Move) => {
    setState(prevState => {
      const newRods = prevState.rods.map(rod => [...rod]);
      const disk = newRods[move.from].pop();
      if (disk !== undefined) {
        newRods[move.to].push(disk);
      }
      return {
        ...prevState,
        rods: newRods
      };
    });
  }, []);

  // 播放下一步
  const playNextMove = useCallback(() => {
    setState(prevState => {
      if (prevState.currentMoveIndex >= prevState.moves.length) {
        return { ...prevState, isPlaying: false };
      }
      
      const move = prevState.moves[prevState.currentMoveIndex];
      const newRods = prevState.rods.map(rod => [...rod]);
      const disk = newRods[move.from].pop();
      if (disk !== undefined) {
        newRods[move.to].push(disk);
      }
      
      return {
        ...prevState,
        rods: newRods,
        currentMoveIndex: prevState.currentMoveIndex + 1
      };
    });
  }, []);

  // 自动播放
  useEffect(() => {
    if (!state.isPlaying) return;
    
    if (state.currentMoveIndex >= state.moves.length) {
      setState(prev => ({ ...prev, isPlaying: false }));
      return;
    }
    
    const timer = setTimeout(() => {
      playNextMove();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [state.isPlaying, state.currentMoveIndex, state.moves.length, playNextMove]);

  // 开始/暂停播放
  const togglePlayback = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  // 重置游戏
  const reset = useCallback(() => {
    initializeGame(state.diskCount);
  }, [state.diskCount, initializeGame]);

  // 上一步
  const previousMove = useCallback(() => {
    setState(prev => {
      if (prev.currentMoveIndex <= 0) return prev;
      
      const moveIndex = prev.currentMoveIndex - 1;
      const move = prev.moves[moveIndex];
      
      const newRods = prev.rods.map(rod => [...rod]);
      const disk = newRods[move.to].pop();
      if (disk !== undefined) {
        newRods[move.from].push(disk);
      }
      
      return {
        ...prev,
        rods: newRods,
        currentMoveIndex: moveIndex,
        isPlaying: false
      };
    });
  }, []);

  // 下一步
  const nextMove = useCallback(() => {
    setState(prev => {
      if (prev.currentMoveIndex >= prev.moves.length) return prev;
      
      const move = prev.moves[prev.currentMoveIndex];
      const newRods = prev.rods.map(rod => [...rod]);
      const disk = newRods[move.from].pop();
      if (disk !== undefined) {
        newRods[move.to].push(disk);
      }
      
      return {
        ...prev,
        rods: newRods,
        currentMoveIndex: prev.currentMoveIndex + 1,
        isPlaying: false
      };
    });
  }, []);

  // 改变圆盘数量
  const changeDiskCount = useCallback((count: number) => {
    initializeGame(count);
  }, [initializeGame]);

  return {
    ...state,
    initializeGame,
    executeMove,
    playNextMove,
    togglePlayback,
    reset,
    previousMove,
    nextMove,
    changeDiskCount,
    progress: state.totalMoves > 0 ? (state.currentMoveIndex / state.totalMoves) * 100 : 0
  };
};
