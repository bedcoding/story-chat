'use client';

import { useState } from 'react';
import { Play, Users, Heart, Star, Clock, BookOpen, Menu, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StoryCard {
  id: string;
  title: string;
  character: string;
  genre: string[];
  description: string;
  thumbnail: string;
  progress: number;
  lastPlayed: string;
  relationship: number;
  isNew?: boolean;
}

export default function Home() {
  const [stories] = useState<StoryCard[]>([
    {
      id: '1',
      title: '카페 알바생 유나',
      character: '유나',
      genre: ['로맨스', '일상'],
      description: '조용한 카페에서 일하는 유나. 오늘도 손님들의 이야기를 들으며 하루를 보낸다.',
      thumbnail: '☕',
      progress: 25,
      lastPlayed: '2시간 전',
      relationship: 15
    },
    {
      id: '2',
      title: '마법소녀 아리엘',
      character: '아리엘',
      genre: ['판타지', '마법소녀'],
      description: '세계를 구하는 마법소녀 아리엘. 하지만 그녀에게도 고민이 있다.',
      thumbnail: '🔮',
      progress: 0,
      lastPlayed: '아직 시작 안함',
      relationship: 0,
      isNew: true
    },
    {
      id: '3',
      title: '해커 제로',
      character: '제로',
      genre: ['SF', '액션'],
      description: '사이버 세계의 전설적인 해커. 정의를 위해 싸우는 디지털 의적.',
      thumbnail: '💻',
      progress: 60,
      lastPlayed: '1일 전',
      relationship: 45
    },
    {
      id: '4',
      title: '암살자 셀레나',
      character: '셀레나',
      genre: ['액션', '스릴러'],
      description: '완벽한 임무 수행으로 유명한 암살자. 하지만 이번 타겟은 조금 다르다.',
      thumbnail: '🗡️',
      progress: 80,
      lastPlayed: '3일 전',
      relationship: 70
    },
    {
      id: '5',
      title: '우주의사 레이',
      character: '닥터 레이',
      genre: ['SF', '의료'],
      description: '우주 정거장의 유일한 의사. 생명을 구하는 것이 그의 사명이다.',
      thumbnail: '🚀',
      progress: 0,
      lastPlayed: '아직 시작 안함',
      relationship: 0,
      isNew: true
    },
    {
      id: '6',
      title: '몬스터헌터 카이',
      character: '카이',
      genre: ['액션', '모험'],
      description: '몬스터를 사냥하는 최고의 헌터. 세계 평화를 지키는 영웅.',
      thumbnail: '⚔️',
      progress: 35,
      lastPlayed: '5일 전',
      relationship: 30
    }
  ]);

  const getRelationshipColor = (relationship: number) => {
    if (relationship >= 70) return 'text-pink-400';
    if (relationship >= 40) return 'text-purple-400';
    if (relationship >= 15) return 'text-blue-400';
    return 'text-slate-400';
  };

  const getRelationshipLabel = (relationship: number) => {
    if (relationship >= 70) return '깊은 유대';
    if (relationship >= 40) return '친밀함';
    if (relationship >= 15) return '호감';
    if (relationship > 0) return '알아가는 중';
    return '처음 만남';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header - 크랙 스타일 */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button className="p-2">
            <Menu className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="text-white text-lg font-semibold">캐릭터 선택</h1>
          <button className="p-2">
            <Search className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pb-8">
        <div className="pt-6 pb-4">
          <p className="text-gray-400 text-sm">함께 스토리를 만들어갈 웹툰 캐릭터를 선택하세요</p>
        </div>

        {/* Character List */}
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex gap-4">
                {/* Character Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                    {story.thumbnail}
                  </div>
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg">{story.character}</h3>
                    {story.isNew && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">{story.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{story.description}</p>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {story.genre.map((genre, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Progress & Relationship */}
                  <div className="flex items-center justify-between mb-3">
                    {story.progress > 0 ? (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>진행도 {story.progress}%</span>
                        <span>•</span>
                        <span className={getRelationshipColor(story.relationship)}>
                          {getRelationshipLabel(story.relationship)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">새로운 만남</span>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{story.lastPlayed}</span>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Link
                    href={`/chat?story=${story.id}`}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {story.progress > 0 ? '계속하기' : '시작하기'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}