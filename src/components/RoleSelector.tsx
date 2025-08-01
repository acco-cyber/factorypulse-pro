import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, User } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: 'admin' | 'operator';
  onRoleChange: (role: 'admin' | 'operator') => void;
}

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Access Level:</span>
      <Select value={currentRole} onValueChange={onRoleChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="operator">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Operator</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}