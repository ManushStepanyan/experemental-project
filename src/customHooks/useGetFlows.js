import axios from "axios";
import { useQuery } from "react-query";
import useStore from "../store";

const useGetFlows = () => {
  const { setFlows } = useStore();
  useQuery(
    "fetch-data",
    () => {
      return axios.get("http://localhost:8082/flows");
    },
    {
      onSuccess: (data) => {
        setFlows(data.data, false);
      },
    },
  );
};

export default useGetFlows;
