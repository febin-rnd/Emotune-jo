// Realistic emotion analysis for different types of songs
export const analyzeSpotifyTrack = (spotifyUrl: string) => {
  // Extract track ID for basic categorization (in real app, you'd use Spotify API + lyrics API)
  const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0];
  
  // Sample realistic emotion data for different song types
  const emotionSets = {
    // Sad/Breakup songs
    sad: [
      { timestamp: "00:10", time: 10, lyric: "I can't believe you're really gone", emotion: "Sad", emoji: "💔", quote: "The heart breaks in silence." },
      { timestamp: "00:25", time: 25, lyric: "Empty rooms echo with your name", emotion: "Lonely", emoji: "🌧️", quote: "Loneliness fills every corner." },
      { timestamp: "00:40", time: 40, lyric: "I remember when we used to laugh", emotion: "Nostalgic", emoji: "🍂", quote: "Memories are bittersweet treasures." },
      { timestamp: "00:55", time: 55, lyric: "Now I'm drowning in these tears", emotion: "Sad", emoji: "😢", quote: "Tears are words the heart can't express." },
      { timestamp: "01:10", time: 70, lyric: "Maybe someday I'll be okay", emotion: "Hopeful", emoji: "🌅", quote: "Hope whispers in the darkest moments." },
      { timestamp: "01:25", time: 85, lyric: "But tonight I fall apart", emotion: "Sad", emoji: "💧", quote: "Sometimes falling apart is falling together." }
    ],
    
    // Happy/Upbeat songs
    happy: [
      { timestamp: "00:08", time: 8, lyric: "Wake up with the sunshine", emotion: "Joy", emoji: "☀️", quote: "Every sunrise brings new possibilities." },
      { timestamp: "00:22", time: 22, lyric: "Dancing through the streets", emotion: "Joy", emoji: "💃", quote: "Life is a dance, enjoy every step." },
      { timestamp: "00:36", time: 36, lyric: "Nothing can bring me down today", emotion: "Happy", emoji: "😊", quote: "Happiness is a choice we make." },
      { timestamp: "00:50", time: 50, lyric: "Friends by my side, we're alive", emotion: "Joy", emoji: "🎉", quote: "Friendship multiplies joy." },
      { timestamp: "01:04", time: 64, lyric: "This is our moment to shine", emotion: "Confident", emoji: "✨", quote: "Confidence lights up the world." },
      { timestamp: "01:18", time: 78, lyric: "Living life with no regrets", emotion: "Free", emoji: "🦋", quote: "Freedom is living authentically." }
    ],
    
    // Love songs
    love: [
      { timestamp: "00:12", time: 12, lyric: "When I look into your eyes", emotion: "Love", emoji: "😍", quote: "Eyes are windows to the soul." },
      { timestamp: "00:28", time: 28, lyric: "My heart skips a beat", emotion: "Love", emoji: "💕", quote: "Love makes the heart dance." },
      { timestamp: "00:44", time: 44, lyric: "You're my everything, my world", emotion: "Love", emoji: "🌍", quote: "Love expands our universe." },
      { timestamp: "01:00", time: 60, lyric: "Together we can face anything", emotion: "Hopeful", emoji: "🤝", quote: "Love conquers all fears." },
      { timestamp: "01:16", time: 76, lyric: "Forever starts with you and me", emotion: "Love", emoji: "💖", quote: "True love is eternal." },
      { timestamp: "01:32", time: 92, lyric: "In your arms I found my home", emotion: "Peaceful", emoji: "🏠", quote: "Home is where love lives." }
    ],
    
    // Motivational/Inspirational
    motivational: [
      { timestamp: "00:15", time: 15, lyric: "Rise up from the ashes", emotion: "Determined", emoji: "🔥", quote: "From struggle comes strength." },
      { timestamp: "00:30", time: 30, lyric: "I won't give up this fight", emotion: "Strong", emoji: "💪", quote: "Persistence breaks through barriers." },
      { timestamp: "00:45", time: 45, lyric: "Dreams are worth the pain", emotion: "Hopeful", emoji: "🌟", quote: "Dreams fuel the soul's journey." },
      { timestamp: "01:00", time: 60, lyric: "I am stronger than I know", emotion: "Confident", emoji: "⚡", quote: "Inner strength is limitless." },
      { timestamp: "01:15", time: 75, lyric: "Victory is in my hands", emotion: "Triumphant", emoji: "🏆", quote: "Success belongs to the persistent." },
      { timestamp: "01:30", time: 90, lyric: "Nothing can stop me now", emotion: "Powerful", emoji: "🚀", quote: "Unstoppable force meets unlimited potential." }
    ],
    
    // Chill/Relaxed
    chill: [
      { timestamp: "00:20", time: 20, lyric: "Floating on a summer breeze", emotion: "Peaceful", emoji: "🍃", quote: "Peace flows like gentle wind." },
      { timestamp: "00:40", time: 40, lyric: "Time moves slow when you're here", emotion: "Content", emoji: "⏰", quote: "Perfect moments feel eternal." },
      { timestamp: "01:00", time: 60, lyric: "Stars reflect in your eyes", emotion: "Dreamy", emoji: "✨", quote: "Beauty exists in quiet moments." },
      { timestamp: "01:20", time: 80, lyric: "Everything feels just right", emotion: "Serene", emoji: "🌙", quote: "Serenity is life's greatest gift." },
      { timestamp: "01:40", time: 100, lyric: "Let the world fade away", emotion: "Peaceful", emoji: "🌊", quote: "Sometimes we need to disconnect to reconnect." }
    ]
  };
  
  // Simple categorization based on common patterns (in real app, use AI/ML)
  if (trackId) {
    const hash = trackId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const categories = Object.keys(emotionSets);
    const category = categories[Math.abs(hash) % categories.length];
    return emotionSets[category as keyof typeof emotionSets];
  }
  
  return emotionSets.happy; // Default fallback
};

export const analyzeUploadedFile = (fileName: string) => {
  // Analyze based on filename patterns (in real app, use audio analysis + lyrics extraction)
  const name = fileName.toLowerCase();
  
  if (name.includes('sad') || name.includes('cry') || name.includes('break') || name.includes('hurt')) {
    return analyzeSpotifyTrack('sad');
  } else if (name.includes('happy') || name.includes('dance') || name.includes('party') || name.includes('fun')) {
    return analyzeSpotifyTrack('happy');
  } else if (name.includes('love') || name.includes('heart') || name.includes('kiss')) {
    return analyzeSpotifyTrack('love');
  } else if (name.includes('fight') || name.includes('strong') || name.includes('power')) {
    return analyzeSpotifyTrack('motivational');
  } else if (name.includes('chill') || name.includes('relax') || name.includes('calm')) {
    return analyzeSpotifyTrack('chill');
  }
  
  // Default mixed emotions for unknown files
  return [
    { timestamp: "00:10", time: 10, lyric: "Music speaks what words cannot", emotion: "Peaceful", emoji: "🎵", quote: "Music is the language of the soul." },
    { timestamp: "00:30", time: 30, lyric: "Every note tells a story", emotion: "Thoughtful", emoji: "📖", quote: "Stories live in every melody." },
    { timestamp: "00:50", time: 50, lyric: "Rhythm moves through my veins", emotion: "Energetic", emoji: "⚡", quote: "Music energizes the spirit." },
    { timestamp: "01:10", time: 70, lyric: "Harmony brings us together", emotion: "Unity", emoji: "🤝", quote: "Music unites all hearts." },
    { timestamp: "01:30", time: 90, lyric: "This song will live forever", emotion: "Timeless", emoji: "♾️", quote: "Great music transcends time." }
  ];
};
