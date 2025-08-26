'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Heart, Star, Zap, Home, RotateCcw, ArrowLeft, MoreVertical, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system' | 'narration' | 'image' | 'button';
  content: string;
  timestamp: Date;
  character?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonAction?: string;
}

interface TurnMission {
  turn: number;
  title: string;
  objective: string;
  completed: boolean;
  webtoonImage?: string;
}

interface CharacterStats {
  managementScore: number; // 포로 관리 점수
  bossRating: number; // 상사 평가
  prisonerSatisfaction: number; // 포로 만족도
  missionProgress: number;
  currentTurn: number;
}

export default function ChatPage() {
  const [currentMission, setCurrentMission] = useState<TurnMission>({
    turn: 1,
    title: '포로의 식사',
    objective: '7군 부사령관 엘프와 대화하여 식사를 제공한다',
    completed: false,
    webtoonImage: '🏰'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: '1턴: 포로의 식사 - 7군 부사령관 엘프와 대화하여 식사를 제공한다',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'narration',
      content: '전장에서 항복하고 오크 군의 포로가 된 첫째 날. 적대 관계인 만큼 우호적인 대우를 받지 못할 수 있다는 예상을 하긴 했지만...',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'image',
      content: '',
      imageUrl: '/images/turn1_1.png',
      timestamp: new Date()
    },
    {
      id: '4', 
      type: 'ai',
      content: '이봐, 포로에게는 식사 제공이 안 되는건가?',
      character: '7군 부사령관 엘프',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAutoOptions, setShowAutoOptions] = useState(false);
  const [characterStats, setCharacterStats] = useState<CharacterStats>({
    managementScore: 45, // 포로 관리 점수
    bossRating: 30, // 상사 평가 (낮음 - 아직 신참)
    prisonerSatisfaction: 20, // 포로 만족도 (낮음 - 아직 불만족)
    missionProgress: 1,
    currentTurn: 1
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const autoDialogueOptions = [
    "아뇨, 당연히 식사는 제때 드리는데... 7군 부사령관님, 여기 이송되실 때 식사와 물을 일절 먹지 않겠다고 하시지 않았나요?",
    "죄송합니다, 바로 확인해서 식사를 준비해드리겠습니다.",
    "혹시 특별히 드시고 싶은 음식이 있으시면 말씀해주세요."
  ];

  const handleSendMessage = async (message?: string) => {
    const messageContent = message || inputValue.trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowAutoOptions(false);
    setIsLoading(true);

    // 웹툰 턴제 시스템 시뮬레이션
    setTimeout(() => {
      let responses: Message[] = [];
      
      if (messageContent.includes('식사와 물을 일절 먹지 않겠다고')) {
        // 정답 선택시 스토리 진행
        responses = [
          {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: '...뭐? 내가 그런 말을 했다고?',
            character: '7군 부사령관 엘프',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'image',
            content: '',
            imageUrl: '/images/turn1_2.png',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 3).toString(),
            type: 'narration',
            content: '그때 옆에서 다른 오크가 끼어든다.',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 4).toString(),
            type: 'ai',
            content: '야, 그건 4군 사령관이야.',
            character: '다른 오크',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 5).toString(),
            type: 'image',
            content: '',
            imageUrl: '/images/turn1_3.png',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 6).toString(),
            type: 'narration',
            content: '알고보니 오크들이 착오로 7군 부사령관을 굶겼고 밥안먹겠다는 4군 사령관은 맛있게 밥을 먹고 있었다.',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 7).toString(),
            type: 'image',
            content: '',
            imageUrl: '/images/turn1_4.png',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 8).toString(),
            type: 'button',
            content: '다음으로',
            buttonAction: 'nextTurn',
            timestamp: new Date()
          },
        ];
        
        // 미션 진행도 업데이트 - 정답 선택시
        setCharacterStats(prev => ({
          ...prev,
          managementScore: Math.min(prev.managementScore + 10, 100), // 관리 점수 상승
          prisonerSatisfaction: Math.min(prev.prisonerSatisfaction + 15, 100), // 포로 만족도 대폭 상승
          missionProgress: 3
        }));
      } else {
        // 일반 응답
        responses = [
          {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: '흠... 그런 건 알겠는데, 빨리 해결해줘. 배가 고프다.',
            character: '7군 부사령관 엘프',
            timestamp: new Date()
          }
        ];
        
        setCharacterStats(prev => ({
          ...prev,
          managementScore: Math.min(prev.managementScore + 2, 100), // 관리 점수 소폭 상승
          prisonerSatisfaction: Math.min(prev.prisonerSatisfaction + 1, 100) // 포로 만족도 소폭 상승
        }));
      }
      
      setMessages(prev => [...prev, ...responses]);
      setIsLoading(false);
    }, 1500);
  };

  const handleButtonClick = (action: string) => {
    if (action === 'nextTurn') {
      // turn2로 이동하는 로직
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetStory = () => {
    setMessages([
      {
        id: '1',
        type: 'system',
        content: '새로운 스토리가 시작됩니다. 당신은 이 세계의 관찰자입니다.',
        timestamp: new Date()
      },
      {
        id: '2', 
        type: 'ai',
        content: '안녕하세요... 저는 이 작은 카페에서 일하고 있는 유나입니다. 오늘도 평범한 하루가 시작될 줄 알았는데, 뭔가 이상한 기운이 느껴져요. 당신도 느끼시나요?',
        timestamp: new Date()
      }
    ]);
    setCharacterStats({
      managementScore: 45,
      bossRating: 30,
      prisonerSatisfaction: 20,
      missionProgress: 1,
      currentTurn: 1
    });
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header - 크랙 스타일 */}
      <header className="bg-black border-b border-gray-800 flex-shrink-0">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
              🏰
            </div>
            <div>
              <h1 className="text-white text-sm font-semibold">오크의 포로관리</h1>
              <p className="text-gray-400 text-xs">{currentMission.turn}턴: {currentMission.title}</p>
            </div>
          </div>
          
          <button className="p-2">
            <MoreVertical className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full min-h-0">
        {/* Mission Banner */}
        <div className="bg-blue-900/50 border-b border-gray-800 p-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-300 text-xs">🎯 목표</span>
            <span className="text-white text-xs font-medium">{currentMission.objective}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(characterStats.missionProgress / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : message.type === 'image' || message.type === 'button' ? 'justify-center' : 'justify-start'}`}
            >
              {message.type === 'image' ? (
                <div className="max-w-[280px] bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={message.imageUrl || '/images/placeholder.png'}
                    alt={message.imageAlt || '웹툰 장면'}
                    width={280}
                    height={180}
                    className="w-full h-auto"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : message.type === 'button' ? (
                <button
                  onClick={() => handleButtonClick(message.buttonAction!)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-lg"
                >
                  {message.content}
                </button>
              ) : (
                <div
                  className={`max-w-[280px] px-3 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-red-500 text-white rounded-br-md'
                      : message.type === 'ai'
                      ? 'bg-gray-800 text-gray-100 rounded-bl-md'
                      : message.type === 'narration'
                      ? 'bg-gray-600/70 text-gray-200 text-center mx-auto italic rounded-lg'
                      : 'bg-blue-800/50 text-blue-200 text-center mx-auto rounded-lg'
                  }`}
                >
                  {message.type === 'ai' && message.character && (
                    <p className="text-xs text-gray-400 mb-1">{message.character}</p>
                  )}
                  
                  {message.type !== 'system' && (
                    <p className={`text-sm leading-relaxed ${message.type === 'narration' ? 'text-xs' : ''}`}>
                      {message.type === 'narration' ? `*${message.content}*` : message.content}
                    </p>
                  )}
                  
                  {message.type === 'system' && (
                    <p className="text-xs text-center font-medium">{message.content}</p>
                  )}
                  
                  {message.type !== 'system' && (
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Auto Dialogue Options - Modal Overlay */}
        {showAutoOptions && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setShowAutoOptions(false)}
          >
            <div 
              className="bg-gray-900 border border-gray-700 rounded-t-2xl w-full max-w-md mx-auto p-4 space-y-3 transform transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-sm font-medium">💬 대화 선택지</p>
                <button
                  onClick={() => setShowAutoOptions(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              {autoDialogueOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(option)}
                  className="w-full text-left bg-gray-800 hover:bg-gray-700 text-gray-200 p-4 rounded-xl text-sm transition-colors border border-gray-600"
                >
                  <span className="text-blue-400 font-medium">{index + 1})</span> {option}
                </button>
              ))}
              
              <button
                onClick={() => setShowAutoOptions(false)}
                className="w-full text-center bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 rounded-xl text-sm transition-colors mt-4"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-800 bg-black p-4 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="직접 입력하거나 자동생성을 사용하세요..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 text-sm"
            />
            <button
              onClick={() => setShowAutoOptions(!showAutoOptions)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 rounded-full transition-colors flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white p-2.5 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Character Stats - Floating Bottom Panel */}
        <div className="bg-gray-900 border-t border-gray-800 p-3 flex-shrink-0">
          <div className="space-y-2 text-xs">
            {/* 첫 번째 줄: 3개 스탯 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-gray-300">관리점수</span>
                <span className="text-white font-medium">{characterStats.managementScore}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400" />
                <span className="text-gray-300">포로만족</span>
                <span className="text-white font-medium">{characterStats.prisonerSatisfaction}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-400" />
                <span className="text-gray-300">상사평가</span>
                <span className="text-white font-medium">{characterStats.bossRating}</span>
              </div>
            </div>
            {/* 두 번째 줄: 턴 정보 */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" />
                <span className="text-gray-300">{characterStats.currentTurn}턴</span>
                <span className="text-blue-400">진행도 {characterStats.missionProgress}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
