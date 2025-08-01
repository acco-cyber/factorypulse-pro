import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

interface MaintenanceLog {
  id: string;
  date: string;
  issue: string;
  resolution: string;
}

export default function MaintenanceLogsTable() {
  const [logs, setLogs] = useState<MaintenanceLog[]>([
    {
      id: '1',
      date: '2025-01-30',
      issue: 'Temperature spike detected',
      resolution: 'Cooling fan replaced, system optimized'
    },
    {
      id: '2',
      date: '2025-01-29',
      issue: 'Vibration threshold exceeded',
      resolution: 'Motor bearing lubricated, calibration adjusted'
    },
    {
      id: '3',
      date: '2025-01-28',
      issue: 'Power consumption anomaly',
      resolution: 'Electrical connections tightened, efficiency restored'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<MaintenanceLog>>({});

  const handleEdit = (log: MaintenanceLog) => {
    setEditingId(log.id);
    setEditValues(log);
  };

  const handleSave = () => {
    if (editingId && editValues) {
      setLogs(logs.map(log => 
        log.id === editingId 
          ? { ...log, ...editValues } as MaintenanceLog
          : log
      ));
      setEditingId(null);
      setEditValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const handleAddNew = () => {
    const newLog: MaintenanceLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      issue: '',
      resolution: ''
    };
    setLogs([newLog, ...logs]);
    setEditingId(newLog.id);
    setEditValues(newLog);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Maintenance Journal</h2>
        <Button onClick={handleAddNew} variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>
      
      <Card className="bg-metric border-metric-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-metric-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Issue Detected</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Resolution Applied</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-metric-border last:border-b-0">
                  <td className="p-4">
                    {editingId === log.id ? (
                      <Input
                        type="date"
                        value={editValues.date || ''}
                        onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
                        className="w-full"
                      />
                    ) : (
                      <span className="text-sm text-foreground">{log.date}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === log.id ? (
                      <Input
                        value={editValues.issue || ''}
                        onChange={(e) => setEditValues({ ...editValues, issue: e.target.value })}
                        placeholder="Describe the issue..."
                        className="w-full"
                      />
                    ) : (
                      <span className="text-sm text-foreground">{log.issue}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === log.id ? (
                      <Input
                        value={editValues.resolution || ''}
                        onChange={(e) => setEditValues({ ...editValues, resolution: e.target.value })}
                        placeholder="Describe the resolution..."
                        className="w-full"
                      />
                    ) : (
                      <span className="text-sm text-foreground">{log.resolution}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === log.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSave}
                            className="h-8 w-8 p-0 hover:bg-status-safe/20"
                          >
                            <Save className="h-4 w-4 text-status-safe" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(log)}
                            className="h-8 w-8 p-0 hover:bg-primary/20"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(log.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/20"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}