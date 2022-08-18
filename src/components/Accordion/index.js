import React, { useState } from "react";
import Axios from "axios";
import DomainUrlAPi from "./../../config/project";

function Accodian({ explorer }) {
  const [expand, setExpand] = useState(false);
  const [itemsData, setItemData] = useState("");
  const [data, setData] = useState([]);
  const [innerData, setInnerData] = useState([]);
  console.log("explorer.entries", explorer.entries);

  if (explorer) {
    function getUniqueListBy(arr, key) {
      return [
        ...new Map(
          arr?.map((item) => [
            item[key] !== undefined ? item[key] : "",
            item !== undefined ? item : "",
          ])
        ).values(),
      ];
    }
    const showInfo = (e, item) => {
      e.preventDefault();
      console.log("Clicked", item);
      setItemData(item);

      Axios.get(`${DomainUrlAPi.SERVER_API_URL}=${item}`).then(
        (response) => {
          setData((prevState) => [
            ...(prevState !== undefined
              ? getUniqueListBy(prevState, "name")
              : null),
            response.data.entries!==undefined?response.data.entries:[{name:"... (other files and directories inside this directory) ..."}],
          ]);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    const showInnerChild = (e) => {
      if (data) {
        return (
          data !== undefined &&
          data?.map((item) =>
            item?.map((child, i) => {
              return (
                <div onClick={(e) => showDataChild(e, child.name)}>
                  {child.name !== undefined ? child.name : ""}
                </div>
              );
            })
          )
        );
      } else {
        return null;
      }
    };
    const showDataChild = (e, item) => {
      e.preventDefault();

      Axios.get(`${DomainUrlAPi.SERVER_API_URL}=${itemsData}%2F${item}`).then(
        (response) => {
          setInnerData(response.data.entries!==undefined?response.data.entries:[{name:"... (other files and directories inside this directory) ..."}],);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    const showInsideInnerChild = (e) => {
      if (innerData) {
        return (
          innerData !== undefined &&
          innerData?.map((child, i) => {
            return <div>{child.name}</div>;
          })
        );
      } else {
        return null;
      }
    };
    const ModalClose = () => {
      setExpand(false);
    };

    console.log("innerChild", innerData);
    return (
      <div>
        <>
          {expand !== true ? (
            <div onClick={() => setExpand((prevState) => !prevState)}>
              {explorer.id}
            </div>
          ) : (
            ""
          )}

          {expand ? (
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={ModalClose}>
                  &times;
                </span>
                <div>{explorer.id}</div>
                <div style={{ display: "flex" }}>
                  <div>
                    {explorer.entries.map((child, i) => {
                      return (
                        <>
                          <div
                            key={i}
                            className="accordionDrop"
                            onClick={(e) => showInfo(e, child.name)}
                          >
                            {child.name}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div>{showInnerChild()}</div>
                  <div style={{ marginLeft: "2rem" }}>
                    {showInsideInnerChild()}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      </div>
    );
  } else {
    return <div className="accordion">{explorer.id}</div>;
  }
}

export default Accodian;