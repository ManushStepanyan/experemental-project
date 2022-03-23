import axios from "axios";
import { useMutation } from "react-query";
import useStore from "../store";

export const useAddFlows = () => {
  const { addFlow } = useStore();

    return useMutation(
      (flow) => {
        return axios.post("http://localhost:8082/flows", flow);
      },
      {
        onSuccess: (data) => {
          addFlow(data.data);
        },
      }
    );
};