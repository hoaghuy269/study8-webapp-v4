import {useContext} from "react";

import {UserProfileContext} from "../components/user-profile/user-profile-provider";

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('use-user-profile.ts | Error | useUserProfile must be used within a UserProfileProvider');
    }
    return context;
};