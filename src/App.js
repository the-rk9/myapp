import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [myUsers, setMyUsers] = useState("None");
  const [postData, setPostData] = useState({ title: "", textarea: "" });
  const [record, setRecord] = useState([]);

  useEffect(() => {
    async function getData() {
      const actualData = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      ).then((response) => response.json());
      setUsersData(actualData);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    setMyUsers(e.target.value);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPostData({ ...postData, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (myUsers === "None" || !postData.title || !postData.textarea) {
      alert("Fill All The Details!");
    } else {
      const newData = usersData.filter((values) => {
        return values.name === myUsers;
      });

      setRecord([...newData, postData]);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Success✍️");
        })
        .catch((error) => {
          alert("Error❓");
        });
        setMyUsers("None")
        setPostData({title:"",textarea:""})
    }
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <div className="container">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option value={myUsers}>None</option>
            {usersData.map((values) => {
              return (
                <option key={values.id} value={values.name}>
                  {values.name}
                </option>
              );
            })}
          </select>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label ">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Your Title!"
              name="title"
              onChange={handleInput}
              value={postData.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="textarea"
              onChange={handleInput}
              value={postData.textarea}
              placeholder="Enter The Description"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
