import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onDismissAlert: (id: string) => void;
}

export default function AlertsPanel({ alerts, onDismissAlert }: AlertsPanelProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return '🌡️';
      case 'vibration':
        return '📳';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Critical Alert System</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-status-critical rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">{alerts.length} Active</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <Card className="p-6 bg-metric border-metric-border">
            <div className="text-center">
              <div className="w-12 h-12 bg-status-safe/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-status-safe" />
              </div>
              <p className="text-sm text-muted-foreground">System Operating Normally</p>
              <p className="text-xs text-muted-foreground mt-1">No critical alerts detected</p>
            </div>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className="p-4 bg-alert border-alert-border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="text-xl">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-destructive">
                        ALERT #{alert.id.slice(-4).toUpperCase()}
                      </span>
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm text-foreground font-medium">{alert.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismissAlert(alert.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}