import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalA from "./ModalA";
import { Link, useParams } from "react-router-dom";

const Problem2 = () => {
  const path = useParams();
  console.log(path);
    const [modal, setModal] = useState();
    const [searchNo, setSearchNo] = useState("");
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await axios.get(
        "https://contact.mediusware.com/api/contacts",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (modal === "B") {
        setContacts(
          data?.results?.filter(
            (contact) => contact.country.name === "United States"
          )
        );
      } else {
        setContacts(data?.results);
      }
    };
    if ((modal === "A" || modal === "B") && open) {
      fetchContacts();
    }
  }, [open, modal, searchNo]);
  console.log(modal);
    console.log(contacts);
    const searchHandler = (e) => { 
        setSearchNo(e.target.value);
    }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          {/* <Link to="/all-contacts"> */}
          <button
            onClick={() => {
              setModal("A");
              setOpen(true);
            }}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          {/* </Link> */}
          <button
            onClick={() => {
              setModal("B");
              setOpen(true);
            }}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>
      <ModalA wrapperId="modal">
        <div
          style={{
            position: "fixed",
            display: (modal === "A" || modal === "B") && open ? "flex" : "none",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            background: "black",
            opacity: "1",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <h1 style={{ position: "absolute", top: "1rem", color: "white" }}>
            Modal {modal}
          </h1>
          <div style={{ display: "flex", gap: "1rem", marginTop: "100px" }}>
            <button
              onClick={() => setModal("A")}
              style={{
                background: modal === "A" ? "green" : "",
                padding: "1rem",
                color: "#46139f",
              }}
            >
              All Contacts
            </button>
            <button
              onClick={() => setModal("B")}
              style={{
                background: modal === "B" ? "green" : "",
                padding: "1rem",
                color: "#ff7f50",
              }}
            >
              US Contacts
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              top: "200px",
              bottom: "0",
              background: "white",
              width: "100%",
              overflowY: "scroll",
            }}
          >
            <input type="text" placeholder="Search" onChange={searchHandler} />
            {contacts?.length > 0 &&
              contacts?.map((contact) => {
                return (
                  <div key={contact.id}>
                    <ul style={{ listStyle: "none" }}>
                      <li>
                        {contact?.country?.name} => {contact.phone}
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              background: "white",
              border: "5px solid #46139f",
            }}
          >
            Close
          </button>
        </div>
      </ModalA>
    </div>
  );
};

export default Problem2;
