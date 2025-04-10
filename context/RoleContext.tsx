// context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'Admin' | 'Editor' | 'Viewer';

interface PermissionSet {
  canAdd: boolean;
  canDelete: boolean;
  canEdit: boolean;
}

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  permissions: PermissionSet;
}

const roles: Record<Role, PermissionSet> = {
  Admin: { canAdd: true, canDelete: true, canEdit: true },
  Editor: { canAdd: true, canDelete: false, canEdit: true },
  Viewer: { canAdd: false, canDelete: false, canEdit: false },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [role, setRole] = useState<Role>('Editor');

  const value: UserContextType = {
    role,
    setRole,
    permissions: roles[role],
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used inside UserProvider');
  return context;
};
