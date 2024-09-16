import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type PoliceseLoading =
  | "list"
  | "details"
  | "update"
  | "delete";

export interface IInternalState {
  loading: PoliceseLoading[];

  list?: any[];
  // query: IAnnoucementQuery;

  details?: any;
}

export const internalState: IInternalState = {
  loading: [],
  // query: DEFAULT_QUERY,
};

export interface IExternalState extends IInternalState {
  actions: {
    getData: () => void;
    getDetails: (name: string) => void;

    updateConsultants: (id: number, request: any) => void;
    deleteConsultants: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,
    updateConsultants: DEFAULT_FUNCTION,
    deleteConsultants: DEFAULT_FUNCTION,
  },
};

const PoliceseContext = createContext(externalState);

export default PoliceseContext;
