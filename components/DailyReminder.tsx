
import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Save, PenTool, Volume2 } from 'lucide-react';

interface DailyReminderProps {
  initialText: string;
  onSaveText: (text: string) => void;
}

const DailyReminder: React.FC<DailyReminderProps> = ({ initialText, onSaveText }) => {
  const [text, setText] = useState(initialText);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        setAudioUrl(URL.createObjectURL(blob));
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playRecording = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  return (
    <div className="glass p-8 rounded-[40px] shadow-xl border border-slate-50 flex flex-col gap-6">
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <Volume2 size={18} className="text-teal-500" /> Daily Reminder to Self
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message you want to see every day..."
            className="w-full p-5 rounded-3xl border border-slate-100 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm min-h-[100px] transition-all leading-relaxed"
          />
          <button 
            onClick={() => onSaveText(text)}
            className="absolute bottom-4 right-4 p-2 bg-teal-500 text-white rounded-xl shadow-lg hover:bg-teal-600 transition-all active:scale-95"
          >
            <Save size={16} />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Voice Note</p>
            <p className="text-xs text-slate-600">
              {isRecording ? "Listening..." : audioUrl ? "Voice note saved" : "Record a short audio clip"}
            </p>
          </div>
          
          <div className="flex gap-2">
            {audioUrl && !isRecording && (
              <button 
                onClick={playRecording}
                className="p-3 bg-white text-indigo-500 rounded-full border border-indigo-100 hover:bg-indigo-50 transition-all"
              >
                <Play size={18} fill="currentColor" />
              </button>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-full transition-all shadow-md active:scale-95 ${
                isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-teal-500 text-white hover:bg-teal-600'
              }`}
            >
              {isRecording ? <Square size={18} fill="currentColor" /> : <Mic size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReminder;
