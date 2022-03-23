import React, { useMemo, useState, useEffect } from "react";
import useGetFlows from "../customHooks/useGetFlows";
import useStore from "../store";
import { useAddFlows } from "../customHooks/useAddFlows";
import { useDeleteFlows } from "../customHooks/useDeleteFlow";
import { useUpdateFlow } from "../customHooks/useUpdateFlow.js";
import { v4 as uuid } from "uuid";
import Clock from "./Clock";
import CurrentDate from "./CurrentDate";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";

const Flows = () => {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [type, setType] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedVersion, setUpdatedVersion] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [index, setIndex] = useState(null);
  const { flows, isLoading } = useStore();
  const [pageNumber, setPageNumber] = useState(0);

  const [searchValue, setSearchValue] = useState("");

  const getFilteredFlows = (value, flows) => {
    console.log(flows);
    if (!searchValue) {
      return flows;
    }
    return flows.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.version.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filteredFlows = getFilteredFlows(searchValue, flows);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const debouncedOnChange = useMemo(() => {
    return debounce(handleSearchChange, 1000);
  }, []);

  useEffect(() => {
    // Cancel previous debounce calls during useEffect cleanup.
    return debouncedOnChange.cancel();
  }, []);

  const flowsPerPage = 3;
  const pagesVisited = pageNumber * flowsPerPage;
  const pageCount = Math.ceil(flows.length / flowsPerPage);

  //function controlling the change of page
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useGetFlows();
  const { mutate: addFlows } = useAddFlows();
  const { mutate: deleteUniqueFlow } = useDeleteFlows();
  const { mutate: updateUniqueFlow } = useUpdateFlow();

  const updateFlow = (e, id, item) => {
    setUpdatedName(item.name);
    setUpdatedVersion(item.version);
    setUpdatedType(item.type);
    if (e.target.name === "update") {
      const newFlow = {
        name: updatedName,
        type: updatedType,
        version: updatedVersion,
        id,
      };
      updateUniqueFlow(newFlow);
    }
  };

  const deleteFlow = (id) => {
    deleteUniqueFlow(id);
  };

  const addFlow = () => {
    // const id = uuid();
    const flow = { name, type, version };
    addFlows(flow);
    setName("");
    setType("");
    setVersion("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayedFlows =
    filteredFlows.length === 0 && searchValue? (
      <span style={{ fontSize: "20px", color: "black", margin: "3%" , marginLeft: '7%'}}>
        No results found...
      </span>
    ) : (
      filteredFlows
        .slice(pagesVisited, pagesVisited + flowsPerPage)
        .map((flow) => {
          return (
            <div key={flow.id} className="delete-update-flow">
              {index === flow.id ? (
                <div className="update-page">
                  <div style={{ padding: "2%" }}>
                    <span style={{ paddingRight: "7%", fontWeight: "bold" }}>
                      Name:
                    </span>
                    <input
                      style={{ width: "70%" }}
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  </div>
                  <div style={{ padding: "2%" }}>
                    <span style={{ paddingRight: "9%", fontWeight: "bold" }}>
                      Type:
                    </span>
                    <input
                      style={{ width: "70%" }}
                      type="text"
                      value={updatedVersion}
                      onChange={(e) => setUpdatedVersion(e.target.value)}
                    />
                  </div>
                  <div style={{ padding: "2%" }}>
                    <span style={{ paddingRight: "2%", fontWeight: "bold" }}>
                      Version:
                    </span>
                    <input
                      style={{ width: "70%" }}
                      type="text"
                      value={updatedType}
                      onChange={(e) => setUpdatedType(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flows-content">
                  <div className="single-flow-content">
                    <span style={{ fontWeight: "bold" }}>Name: </span>
                    {flow.name}
                  </div>
                  <div className="single-flow-content">
                    <span style={{ fontWeight: "bold" }}>Version: </span>
                    {flow.version}
                  </div>
                  <div
                    className="single-flow-content"
                    style={{ marginBottom: "3%" }}
                  >
                    <span style={{ fontWeight: "bold" }}>Type: </span>{" "}
                    {flow.type}
                  </div>
                  <div>{flows.indexOf(flow) + 1}</div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  marginLeft: "80%",
                  marginTop: "7%",
                }}
              >
                <div style={{ marginRight: "8%" }}>
                  <button
                    style={{ height: "130%" }}
                    onClick={() => deleteFlow(flow.id)}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    style={{ height: "130%" }}
                    name={index !== null ? "update" : "edit"}
                    onClick={(e) => {
                      updateFlow(e, flow.id, flow);
                      setIndex(index === flow.id ? null : flow.id);
                    }}
                  >
                    {index === flow.id ? "Update" : "Edit"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
    );

  return (
    <>
      <div className="add-input-fields">
        <div className="add-element">
          <div className="date-clock">
            <CurrentDate />
            <Clock />
          </div>
          <input
            style={{ margin: "2%", marginLeft: "4%" }}
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ margin: "2%" }}
            type="text"
            placeholder="version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
          <input
            style={{ margin: "2%" }}
            type="text"
            placeholder="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <button style={{ padding: "1%" }} onClick={addFlow}>
            Add element
          </button>
        </div>
        <div className="total-count-search-bar">
          <div>
            Total {flows.length} {flows.length > 1 ? "flows" : "flow"}
          </div>
          <div>
            <input
              type="text"
              placeholder="search"
              style={{ padding: "3%" }}
              onChange={debouncedOnChange}
            />
          </div>
        </div>
        {displayedFlows}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};

export default Flows;