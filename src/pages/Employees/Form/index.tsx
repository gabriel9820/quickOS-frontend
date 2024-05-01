import { useLocation, useParams } from "react-router-dom";

type Params = {
  id: string;
};

export function EmployeesFormPage() {
  const { id } = useParams<Params>();
  const location = useLocation();

  const readOnly = Boolean(location.state?.readOnly);

  return (
    <div>
      Formulário de Funcionário {id} {readOnly.toString()}
    </div>
  );
}
