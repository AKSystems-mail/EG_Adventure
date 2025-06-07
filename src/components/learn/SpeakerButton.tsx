'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useCallback, useEffect } from 'react';

interface SpeakerButtonProps {
  textToSpeak: string;
  className?: string;
}

const SpeakerButton: React.FC<SpeakerButtonProps> = ({ textToSpeak, className }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleSpeak = useCallback(() => {
    if (!speechSynthesis || !textToSpeak) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    speechSynthesis.cancel(); // Cancel any previous speech
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false); // Handle potential errors
    speechSynthesis.speak(utterance);
  }, [speechSynthesis, textToSpeak, isSpeaking]);
  
  // Cleanup: cancel speech if component unmounts while speaking
  useEffect(() => {
    return () => {
      if (speechSynthesis && isSpeaking) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis, isSpeaking]);


  if (!speechSynthesis) {
    // Hide button if TTS is not supported or not initialized yet
    return null; 
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSpeak}
      aria-label={isSpeaking ? "Stop speaking" : "Read text aloud"}
      className={className}
    >
      {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </Button>
  );
};

export default SpeakerButton;
