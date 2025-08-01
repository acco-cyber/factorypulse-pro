import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Factory Operations AI. I can help you understand alerts, suggest maintenance procedures, and provide operational guidance. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('temperature') || message.includes('overheat')) {
      return 'For temperature alerts: 1) Check cooling system status 2) Verify fan operation 3) Inspect air filters 4) Monitor thermal sensors 5) If critical, initiate emergency shutdown protocol.';
    }
    
    if (message.includes('vibration')) {
      return 'For vibration issues: 1) Check motor mounts and alignment 2) Inspect bearing condition 3) Verify belt tension 4) Look for loose components 5) Schedule bearing lubrication if needed.';
    }
    
    if (message.includes('energy') || message.includes('power')) {
      return 'For power consumption anomalies: 1) Review electrical connections 2) Check for motor efficiency 3) Inspect load conditions 4) Verify power factor correction 5) Consider energy optimization settings.';
    }
    
    if (message.includes('maintenance')) {
      return 'Recommended maintenance schedule: Daily - Check metrics and alerts, Weekly - Inspect physical components, Monthly - Lubricate moving parts, Quarterly - Full system diagnostic. Would you like specific guidance for any equipment?';
    }
    
    if (message.includes('alert') || message.includes('alarm')) {
      return 'Current alert protocols: Critical alerts require immediate attention, Warning alerts should be investigated within 4 hours, Info alerts are logged for trend analysis. What specific alert do you need help with?';
    }
    
    return 'I can help with temperature issues, vibration problems, energy consumption, maintenance scheduling, and alert management. Could you be more specific about your concern?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: getAIResponse(inputValue),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Factory Ops AI</h2>
      
      <Card className="bg-metric border-metric-border h-96 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-metric-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about temperature, vibration, or maintenance..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm" className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}