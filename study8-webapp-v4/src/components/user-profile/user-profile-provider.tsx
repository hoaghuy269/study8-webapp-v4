import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, createContext } from 'react';

import { useRouter } from '../../routes/hooks';
import { apiService } from '../../services/api-service';
import { API_USER_PROFILE } from '../../constant/api-path';
import { useAlert, ALERT_SEVERITY } from '../../hooks/use-alert';

import type { ApiResponse } from '../../libs/types/api-response';
import type { UserProfile } from '../../libs/types/user-profile';

export const UserProfileContext = createContext<{ userProfile: UserProfile | null } | null>(null);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { showSnackbar } = useAlert();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    apiService
      .get<ApiResponse<UserProfile>>(API_USER_PROFILE)
      .then((res) => setUserProfile(res.data))
      .catch((err) => {
        console.error('user-profile-provider.tsx | Error', err);
        router.push('/sign-in');
        showSnackbar('Session expired', ALERT_SEVERITY.ERROR);
      });
  }, [router, showSnackbar]);

  const contextValue = useMemo(() => ({ userProfile }), [userProfile]);

  return <UserProfileContext.Provider value={contextValue}>{children}</UserProfileContext.Provider>;
};
