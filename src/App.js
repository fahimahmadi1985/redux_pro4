import React from "react";

function App(props) {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
          </tr>
        </thead>
        <tbody>
          {props.state.data.map((user, index) => (
            <tr key={index}>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
