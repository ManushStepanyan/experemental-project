import axios from "axios";
import { useMutation } from "react-query";
import useStore from "../store";

export const useUpdateFlow = () => {
  const { editFlow } = useStore();

  return useMutation(
    (flow) => {
      return axios.put(`http://localhost:8082/flows/${flow.id}`, flow);
    },
    {
      onSuccess: (data) => {
        editFlow(data.data);
      },
    }
  );
};