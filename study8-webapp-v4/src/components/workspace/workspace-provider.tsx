import React, { useMemo, useState, createContext } from 'react';

import { DEFAULT_WORKSPACE } from '../../constant/pagination';

type WorkspaceContextType = {
  workspace: string;
  setWorkspace: (w: string) => void;
};

export const WorkspaceContext = createContext<WorkspaceContextType>({
  workspace: DEFAULT_WORKSPACE,
  setWorkspace: () => {},
});

type WorkspaceProviderProps = {
  children: React.ReactNode;
  userProfile?: { accountWorkspace?: string };
};

export const WorkspaceProvider = ({ children, userProfile }: WorkspaceProviderProps) => {
  const initialWorkspace = userProfile?.accountWorkspace || DEFAULT_WORKSPACE;
  const [workspace, setWorkspace] = useState(initialWorkspace);

  const contextValue = useMemo(() => ({ workspace, setWorkspace }), [workspace]);

  return <WorkspaceContext.Provider value={contextValue}>{children}</WorkspaceContext.Provider>;
};
