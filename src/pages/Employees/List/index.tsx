import { useNavigate } from "react-router-dom";

export function EmployeesListPage() {
  const navigate = useNavigate();

  function handleCreateClick() {
    navigate("create");
  }

  function handleEditClick() {
    navigate("3", { state: { readOnly: false } });
  }

  function handleViewClick() {
    navigate("3", { state: { readOnly: true } });
  }

  return (
    <div>
      Listagem de Funcionários
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleViewClick}>View</button>
    </div>
  );
}
