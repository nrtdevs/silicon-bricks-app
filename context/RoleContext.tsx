// // context/UserContext.tsx
// import { QueryDocument } from '@/graphql/generated';
// import { PermissionKeys } from '@/utils/permission';
// import { useLazyQuery } from '@apollo/client';
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import * as SecureStore from "expo-secure-store";


// interface UserContextType {
//   permissions: PermissionKeys;
// }


// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [getUserPermissionById, { error, data, loading, refetch }] = useLazyQuery(
//     QueryDocument
//   );

//   const getUserId = async () => {
//     const userId = await SecureStore.getItemAsync("userId");
//     useEffect(() => {

//       getUserPermissionById({
//         variables: {
//           findPermissionsByUserId: Number(userId),
//         },
//       });
//     }, []);
//   }

//   console.log('0909',getUserId());




//   const value: UserContextType = {
//     permissions: {} as PermissionKeys
//   };
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// export const useUserContext = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error('useUserContext must be used inside UserProvider');
//   return context;
// };


// context/UserContext.tsx
import { QueryDocument } from '@/graphql/generated';
import { PermissionKeys } from '@/utils/permission';
import { useLazyQuery } from '@apollo/client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';

interface UserContextType {
  permissions: PermissionKeys[];
  loading: boolean;
  error: any;
  can: (permission: PermissionKeys) => boolean;
  hasAny: (permissionList: PermissionKeys[]) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [permissions, setPermissions] = useState<PermissionKeys[]>([]);
  const [getUserPermissionById, { data, loading, error }] = useLazyQuery(QueryDocument);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      const storedData = await SecureStore.getItemAsync("userData");
      if (!storedData) return null;
      let parsedUserData = JSON.parse(storedData);
      if (parsedUserData?.userId) {
        getUserPermissionById({
          variables: {
            findPermissionsByUserId: Number(parsedUserData.userId),
          },
        });
      }
    };

    fetchUserPermissions();
  }, []);

  useEffect(() => {
    if (data?.findPermissionsByUser) {
      setPermissions(data.findPermissionsByUser as PermissionKeys[]);
    }
  }, [data]);

  const can = (permission: PermissionKeys): boolean => {
    return permissions.includes(permission);
  };

  const hasAny = (permissionList: PermissionKeys[]): boolean => {
    return permissionList.some((perm) => permissions.includes(perm));
  };

  return <UserContext.Provider value={{
    permissions,
    loading,
    error,
    can,
    hasAny,
  }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used inside UserProvider');
  return context;
};