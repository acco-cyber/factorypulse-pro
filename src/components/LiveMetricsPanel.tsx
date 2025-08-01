import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Activity, Zap } from 'lucide-react';

interface MetricData {
  temperature: number;
  vibration: number;
  energy: number;
}

interface LiveMetricsPanelProps {
  onAlert: (type: string, message: string) => void;
}

export default function LiveMetricsPanel({ onAlert }: LiveMetricsPanelProps) {
  const [metrics, setMetrics] = useState<MetricData>({
    temperature: 65,
    vibration: 2.1,
    energy: 850
  });

  const getStatusColor = (value: number, type: 'temperature' | 'vibration' | 'energy') => {
    if (type === 'temperature') {
      if (value > 80) return 'status-critical';
      if (value > 75) return 'status-warning';
      return 'status-safe';
    }
    if (type === 'vibration') {
      if (value > 5) return 'status-critical';
      if (value > 4) return 'status-warning';
      return 'status-safe';
    }
    if (type === 'energy') {
      if (value > 1800) return 'status-critical';
      if (value > 1500) return 'status-warning';
      return 'status-safe';
    }
    return 'status-safe';
  };

  const checkAlerts = (newMetrics: MetricData, oldMetrics: MetricData) => {
    if (newMetrics.temperature > 80 && oldMetrics.temperature <= 80) {
      onAlert('temperature', 'Critical overheat risk detected!');
    }
    if (newMetrics.vibration > 5 && oldMetrics.vibration <= 5) {
      onAlert('vibration', 'Abnormal vibration detected!');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => {
        const newMetrics = {
          temperature: Math.round((Math.random() * 30 + 60) * 10) / 10,
          vibration: Math.round((Math.random() * 5 + 1) * 10) / 10,
          energy: Math.round(Math.random() * 1500 + 500)
        };
        
        checkAlerts(newMetrics, prevMetrics);
        return newMetrics;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [onAlert]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Live Performance KPIs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-metric border-metric-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Process Heat</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{metrics.temperature}</span>
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full bg-${getStatusColor(metrics.temperature, 'temperature')}`} />
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Status: {metrics.temperature > 80 ? 'CRITICAL' : metrics.temperature > 75 ? 'WARNING' : 'NORMAL'}
          </div>
        </Card>

        <Card className="p-6 bg-metric border-metric-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Machine Vibration</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{metrics.vibration}</span>
                <span className="text-sm text-muted-foreground">mm/s</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full bg-${getStatusColor(metrics.vibration, 'vibration')}`} />
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Status: {metrics.vibration > 5 ? 'CRITICAL' : metrics.vibration > 4 ? 'WARNING' : 'NORMAL'}
          </div>
        </Card>

        <Card className="p-6 bg-metric border-metric-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Power Consumption</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{metrics.energy}</span>
                <span className="text-sm text-muted-foreground">W</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full bg-${getStatusColor(metrics.energy, 'energy')}`} />
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Status: {metrics.energy > 1800 ? 'HIGH' : metrics.energy > 1500 ? 'ELEVATED' : 'NORMAL'}
          </div>
        </Card>
      </div>
    </div>
  );
}