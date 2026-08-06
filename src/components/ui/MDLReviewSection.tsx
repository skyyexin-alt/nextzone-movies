"use client";

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Send, Award, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface MDLReviewSectionProps {
  mediaId: string;
  mediaTitle: string;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  overallScore: number;
  storyScore: number;
  castScore: number;
  ostScore: number;
  rewatchScore: number;
  comment: string;
  upvotes: number;
  userUpvoted?: boolean;
}

const initialReviews: Review[] = [
  {
    id: '1',
    author: 'CinematicExpert',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    date: '2 days ago',
    overallScore: 9.5,
    storyScore: 10,
    castScore: 9.5,
    ostScore: 9.0,
    rewatchScore: 9.0,
    comment: 'An absolute masterpiece of modern cinema! The character arcs are deeply emotional and the musical score heightens every single scene.',
    upvotes: 42,
  },
  {
    id: '2',
    author: 'DramaEnthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    date: '1 week ago',
    overallScore: 8.8,
    storyScore: 9.0,
    castScore: 9.0,
    ostScore: 8.5,
    rewatchScore: 8.5,
    comment: 'Great pacing throughout the entire story. The leads have insane chemistry together. Highly recommended for anyone looking for a compelling watch.',
    upvotes: 19,
  },
];

export default function MDLReviewSection({ mediaId, mediaTitle }: MDLReviewSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newComment, setNewComment] = useState('');
  const [newScore, setNewScore] = useState(9.0);

  const handleUpvote = (id: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === id) {
          const updatedUpvoted = !r.userUpvoted;
          return {
            ...r,
            userUpvoted: updatedUpvoted,
            upvotes: updatedUpvoted ? r.upvotes + 1 : r.upvotes - 1,
          };
        }
        return r;
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '',
      date: 'Just now',
      overallScore: newScore,
      storyScore: newScore,
      castScore: newScore,
      ostScore: newScore,
      rewatchScore: newScore,
      comment: newComment.trim(),
      upvotes: 0,
    };

    setReviews([review, ...reviews]);
    setNewComment('');
  };

  return (
    <div className={`bg-[#14142f] border border-white/8 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300 ${isExpanded ? 'space-y-6' : ''}`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group ${isExpanded ? 'border-b border-white/8 pb-4' : ''}`}
      >
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white flex items-center gap-2 group-hover:text-violet-300 transition-colors">
            <MessageSquare className="w-5 h-5 text-violet-400 shrink-0" />
            <span>Audience Reviews & Breakdown</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">Read and share community scores for {mediaTitle}</p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <span className="text-xs font-bold text-violet-300 bg-violet-600/20 border border-violet-500/30 px-3 py-1 rounded-full">
            {reviews.length} Reviews
          </span>
          <div className="p-1.5 rounded-xl bg-white/5 group-hover:bg-white/10 text-zinc-400 group-hover:text-white transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <>

      {/* Submit New Review Form */}
      <form onSubmit={handleSubmitReview} className="bg-white/3 border border-white/8 rounded-2xl p-4 md:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Write Your Review</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400">Score:</span>
            <select
              value={newScore}
              onChange={(e) => setNewScore(Number(e.target.value))}
              className="bg-[#0a0a18] border border-white/10 text-amber-400 font-black text-xs px-2.5 py-1 rounded-lg focus:outline-none"
            >
              {[10, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.0, 5.0].map((s) => (
                <option key={s} value={s}>
                  ⭐ {s} / 10
                </option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on the story, cast performances, music, and rewatch value..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Review</span>
          </button>
        </div>
      </form>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white/2 border border-white/6 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow">
                  {rev.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-xs">{rev.author}</span>
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-xl text-xs font-black">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{rev.overallScore} / 10</span>
              </div>
            </div>

            {/* Scores breakdown pills */}
            <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold text-zinc-400 bg-white/3 p-2 rounded-xl border border-white/5">
              <span>Story: <strong className="text-violet-300">{rev.storyScore}</strong></span>
              <span>•</span>
              <span>Cast: <strong className="text-violet-300">{rev.castScore}</strong></span>
              <span>•</span>
              <span>OST: <strong className="text-violet-300">{rev.ostScore}</strong></span>
              <span>•</span>
              <span>Rewatch: <strong className="text-violet-300">{rev.rewatchScore}</strong></span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => handleUpvote(rev.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all text-xs font-bold ${
                  rev.userUpvoted
                    ? 'bg-violet-600/30 text-violet-300 border-violet-500/40'
                    : 'bg-white/5 text-zinc-400 hover:text-white border-white/8'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.upvotes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
