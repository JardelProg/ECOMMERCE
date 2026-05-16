import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<any | null>(null);
  const [profile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
