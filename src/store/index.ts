import defaultSettings from '../settings.json';
import { setLocalUser } from '@/utils/function';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    id?: number;
    displayName?: string;
    photoUrl?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  userLoading?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      setLocalUser(userInfo);
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    default:
      return state;
  }
}
