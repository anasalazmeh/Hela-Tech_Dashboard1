import { useReducer } from "react";
import { execute } from "../../utils/api/api-execute";
import reducer from "./reducer";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";
import PoliceseContext, { internalState } from "./context";

export interface IProps {
  children: React.ReactNode;
}
const PoliceseContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/pages");
        dispatch({ type: "SET_LIST", payload: { list: data.data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });
      },
      throwException: false,
    });
  };

  const getDetails = async (name: string) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });

        const { data } = await http.get(`/pages/${name}`);
        dispatch({ type: "SET_DETAILSS", payload: { details: data.data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });
      },
      throwException: false,
    });
  };

  const setDetails = async (data?: any) => {
    // dispatch({ type: 'SET_DETAILSS', payload: { details: data } })
  };

  // const createconsultants = async (request: any) => {
  //   await execute({
  //     callback: async () => {
  //       dispatch({
  //         type: "LOADING",
  //         payload: { loading: "create" },
  //       });

  //       console.log(request);

  //       const consultant= await http.post(`/pages`, getFormData({
  //             name: request.name_en,
  //             description: request.description_en,
  //             specialization: request.specialization_en,
  //             image:request.image
  //        }),
  //        {
  //             headers: {
  //               "Accept-Language":"en",
  //               "Content-Type": "multipart/form-data"
  //             },
  //           }
  //       )
  //      console.log(consultant.data.data.id)
  //       if (consultant.data.data.id) {
  //         await http.post(
  //           `/consultants/${consultant.data.data.id}`,
  //           getFormData({
  //             name: request.name_ar,
  //             description: request.description_ar,
  //             specialization: request.specialization_ar,
  //             lang: "ar",
  //             _method:"PUT",
  //           }),
  //           {
  //             headers: {
  //               "Accept-Language":"ar",
  //               "Content-Type": "multipart/form-data",
  //             },
  //           }
  //         );
  //       }
  //       // await http.post(
  //       //   `/consultants`,
  //       //   getFormData({ ...request }),
  //       //   {
  //       //     headers: {
  //       //       "Content-Type": "multipart/form-data",
  //       //     },
  //       //   }
  //       // );
  //       getData();
  //     },
  //     fallback: (error) => {},
  //     finallyCallback: () => {
  //       dispatch({
  //         type: "LOADING",
  //         payload: { loading: "create" },
  //       });
  //     },
  //     throwException: true,
  //   });
  // };
  const updateconsultants = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });
        await http.post(
          `/pages/${id}`,
          getFormData({
            name: request.name_ar,
            description: request.description_ar,
            specialization: request.specialization_ar,
            lang: "ar",
            _method: "PUT",
          }),
          {
            headers: {
              "Accept-Language":"ar",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await http.post(
          `/pages/${id}`,
          getFormData({
            name: request.name_en,
            description: request.description_en,
            lang: "en",
            _method: "PUT",
          }),
          {
            headers: {
              "Accept-Language":"en",
              "Content-Type": "multipart/form-data",
            },
          }
        );
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });
      },
      throwException: true,
    });
  };

  const deleteconsultants = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await http.delete(`/consultants/${id}`);

        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });
      },
      throwException: true,
    });
  };

  return (
    <PoliceseContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          updateConsultants: updateconsultants,
          deleteConsultants: deleteconsultants,
        },
      }}
    >
      {props.children}
    </PoliceseContext.Provider>
  );
};

export default PoliceseContextProvider;
