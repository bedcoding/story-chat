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
      id: '6093218132590592',
      title: '오크의 포로가 된 엘프 여사령관',
      character: '엘프 여사령관',
      genre: ['판타지', '드라마'],
      description: '치열한 전쟁 끝에 오크군에 사로잡혀 버린 엘프 여사령관 이시르와 레나. 무자비한 엘프 포로와 가녀린 오크군의 파란만장한 병영 생활',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/6093218132590592/images/tall.webp?width=130',
      progress: 15,
      lastPlayed: '30분 전',
      relationship: 12
    },
    {
      id: '5310249108766720',
      title: '아가씨와 우렁총각',
      character: '아가씨',
      genre: ['로맨스'],
      description: '신분 차이를 뛰어넘는 아가씨와 우렁총각의 달콤한 로맨스 이야기.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/5310249108766720/images/tall.jpg?width=130',
      progress: 45,
      lastPlayed: '1시간 전',
      relationship: 25
    },
    {
      id: '5849944865636352',
      title: '연필의 각도',
      character: '홍자',
      genre: ['로맨스'],
      description: '작가 홍자의 감성 로맨스. 연필 하나로 시작된 특별한 만남.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/5849944865636352/images/tall.jpg?width=130',
      progress: 78,
      lastPlayed: '2일 전',
      relationship: 65
    },
    {
      id: '5162568727724032',
      title: '못난이에게 꽃다발을',
      character: '못난이',
      genre: ['로맨스'],
      description: '자신을 못나다고 생각하는 주인공에게 찾아온 예상치 못한 사랑.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/5162568727724032/images/tall.jpg?width=130',
      progress: 0,
      lastPlayed: '아직 시작 안함',
      relationship: 0,
      isNew: true
    },
    {
      id: '6170000663052288',
      title: '신데렐라 리미트',
      character: '신데렐라',
      genre: ['로맨스'],
      description: '현대판 신데렐라 이야기. 시간 제한이 있는 특별한 사랑.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/6170000663052288/images/tall.jpg?width=130',
      progress: 32,
      lastPlayed: '3일 전',
      relationship: 18
    },
    {
      id: '6694684605874176',
      title: '내가 원하는 건',
      character: '정',
      genre: ['로맨스'],
      description: '진짜 원하는 것이 무엇인지 깨달아가는 과정을 그린 로맨스.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/6694684605874176/images/tall.jpg?width=130',
      progress: 88,
      lastPlayed: '12시간 전',
      relationship: 72
    },
    {
      id: '5662308507975680',
      title: '하얀데레',
      character: '하얀',
      genre: ['로맨스'],
      description: '순수해 보이지만 집착하는 그녀의 위험한 사랑 이야기.',
      thumbnail: 'https://ccdn.lezhin.com/v2/comics/5662308507975680/images/tall.jpg?width=130',
      progress: 0,
      lastPlayed: '아직 시작 안함',
      relationship: 0,
      isNew: true
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
        <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
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
      <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 pb-8">
        <div className="pt-6 pb-4">
          <p className="text-gray-400 text-sm">함께 스토리를 만들어갈 웹툰 캐릭터를 선택하세요</p>
        </div>

        {/* Character List */}
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800 flex flex-col h-full">
              {/* Top Content Area */}
              <div className="flex gap-4 flex-1">
                {/* Character Avatar */}
                <div className="flex-shrink-0">
                  {story.thumbnail.startsWith('http') ? (
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl md:text-3xl ${
                    story.thumbnail.startsWith('http') ? 'hidden' : ''
                  }`}>
                    {story.thumbnail.startsWith('http') ? '📖' : story.thumbnail}
                  </div>
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg md:text-xl">{story.character}</h3>
                    {story.isNew && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm md:text-base mb-2">{story.title}</p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-3">{story.description}</p>

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
                </div>
              </div>

              {/* Fixed Bottom Button */}
              <Link
                href={`/chat?story=${story.id}`}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 md:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4" />
                {story.progress > 0 ? '계속하기' : '시작하기'}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}