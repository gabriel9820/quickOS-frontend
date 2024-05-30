import { useLocation, useParams } from "react-router-dom";

type Params = {
  externalId: string;
};

export function CustomersFormPage() {
  const { externalId } = useParams<Params>();
  const location = useLocation();

  const readOnly = Boolean(location.state?.readOnly);

  return (
    <div>
      Formulário de Cliente {externalId} {readOnly.toString()}
    </div>
  );
}
