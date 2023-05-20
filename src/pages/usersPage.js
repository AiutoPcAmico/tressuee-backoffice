import { PagesTable } from "../components/pagesTable";
import { retrieveWorkers } from "../api/indexTreessueApi";
import { useEffect, useState, useMemo } from "react";

const UsersPage = ({ totalOrders }) => {
  const [error, setError] = useState("");
  const [workers, setWorkers]= useState([])

  useEffect(() => {
      retrieveWorkers().then((element) => {
        if (element.isError) {
          setError(element.messageError);
        } else {
          setError("");
          setWorkers(element.data);
          console.log(element.data);
        }
      });
  }, []);

  const columns = useMemo(
    () => [
      { field:"id_worker", headerName:"num", type:"number"},
      { field: 'first_name', headerName:"Nome",type: 'string' },
      { field:"last_name", headerName: 'Cognome', type: 'string' },
      { field:"role", headerName: 'Ruolo', type: 'singleSelect',
      valueOptions: [
        'admin',
        'magazziniere',
        'torrista',
        'ufficio',
      ]},
      {
        field:"username",
        headerName: 'Username',
        type: 'string',
      },
      {
        field:"password",
        headerName: 'Password',
        type: 'string',
        editable: true,
      },
  /*    {
        field: 'actions',
        type: 'actions',
        width: 80,
       getActions: (params) => [
          <GridActionsCellItem
            icon={<i class="bi bi-0-circle"></i>}
            label="Delete"
            onClick={deleteUser(params.id)}
          />
        ],
      },*/
    ],
    [/*deleteUser*/],
  );

  return (
    <div clas={"mx-auto"} style={{ background: "white"}}>
      <PagesTable listObject={workers} headers={columns}></PagesTable>
      </div>
  );
};

export { UsersPage };
