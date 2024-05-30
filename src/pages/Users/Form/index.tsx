import { useLocation, useParams } from "react-router-dom";

type Params = {
  id: string;
};

export function UsersFormPage() {
  const { id } = useParams<Params>();
  const location = useLocation();

  const readOnly = Boolean(location.state?.readOnly);

  return (
    <div>
      Formulário de Usuário {id} {readOnly.toString()}
    </div>
  );
}
