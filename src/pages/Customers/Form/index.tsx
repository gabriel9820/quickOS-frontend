import { useLocation, useParams } from "react-router-dom";

type Params = {
  id: string;
};

export function CustomersFormPage() {
  const { id } = useParams<Params>();
  const location = useLocation();

  const readOnly = Boolean(location.state?.readOnly);

  return (
    <div>
      Formulário de Cliente {id} {readOnly.toString()}
    </div>
  );
}
