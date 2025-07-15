import {useContext} from "react";

import {WorkspaceContext} from "../components/workspace/workspace-provider";

export const useWorkspace = () => useContext(WorkspaceContext);