import axios from "axios";
import { useMutation } from "react-query";
import useStore from "../store";

export const useDeleteFlows = () => {
  const { remove } = useStore();

  return useMutation((id) => {
    axios.delete(`http://localhost:8082/flows/${id}`)
      .then((res) => {
      res.data = id;
      remove(id);
    });
  });
};
