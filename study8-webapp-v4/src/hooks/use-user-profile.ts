import {useContext} from "react";

import {UserProfileContext} from "../components/user-profile/user-profile-provider";

export const useUserProfile = () => useContext(UserProfileContext);