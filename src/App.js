import { useEffect, useState } from "react";
import "./App.css";

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Paginate({ data, postPerPage, paginate, currentPage }) {
  const totalPages = Math.ceil(data.length / postPerPage);

  let newPage = currentPage;

  function handlePaginate(direction) {
    if (direction === "previous" && currentPage > 1) {
      newPage = newPage - 1;
    }
    if (direction === "next" && currentPage < totalPages) {
      newPage = newPage + 1;
    }
    paginate(newPage);
  }

  return (
    <>
      <button onClick={() => handlePaginate("previous")}>Previous</button>
      <button>{newPage}</button>
      <button onClick={() => handlePaginate("next")}>Next</button>
    </>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;

  const lastIndexofItem = currentPage * postPerPage;
  const firstIndexofItem = lastIndexofItem - postPerPage;
  const currentData = data.slice(firstIndexofItem, lastIndexofItem);

  function paginateHandler(page) {
    setCurrentPage(page);
  }

  async function fetchData(URL) {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    } catch (e) {
      alert("failed to fetch data");
    }
  }

  useEffect(() => {
    fetchData(URL);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Employee Data Table</h1>
        <div className="tableContainer">
          <Table data={currentData}></Table>
        </div>
        <div>
          <Paginate
            data={data}
            postPerPage={postPerPage}
            paginate={paginateHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
