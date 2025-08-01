import { useState } from 'react';
import LiveMetricsPanel from '@/components/LiveMetricsPanel';
import AlertsPanel from '@/components/AlertsPanel';
import MaintenanceLogsTable from '@/components/MaintenanceLogsTable';
import AIAssistantPanel from '@/components/AIAssistantPanel';
import RoleSelector from '@/components/RoleSelector';
import { Card } from '@/components/ui/card';
import { Factory, Shield } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
}

const Index = () => {
  const [currentRole, setCurrentRole] = useState<'admin' | 'operator'>('admin');
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleAlert = (type: string, message: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Factory className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FactoryPulse HQ</h1>
                <p className="text-sm text-muted-foreground">Smart Factory Health Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-status-safe rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Metrics and Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <LiveMetricsPanel onAlert={handleAlert} />
            <AlertsPanel alerts={alerts} onDismissAlert={handleDismissAlert} />
          </div>

          {/* Right Column - Logs and AI Assistant */}
          <div className="space-y-6">
            {currentRole === 'admin' ? (
              <>
                <MaintenanceLogsTable />
                <AIAssistantPanel />
              </>
            ) : (
              <Card className="p-6 bg-metric border-metric-border">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Operator Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Additional tools are available for administrators.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Contact your supervisor for access elevation.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Footer Status */}
        <footer className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Last Update: {new Date().toLocaleString()}</span>
              <span>•</span>
              <span>Refresh Rate: 3s</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Monitoring Status:</span>
              <div className="w-2 h-2 bg-status-safe rounded-full" />
              <span>Active</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
