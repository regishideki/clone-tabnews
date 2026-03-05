import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString();
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    const databaseDependencies = data.dependencies.database;
    databaseStatusInformation = (
      <>
        <div>Versão: {databaseDependencies.version}</div>
        <div>Conexões abertas: {databaseDependencies.opened_connections}</div>
        <div>Conexões máximas: {databaseDependencies.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      {databaseStatusInformation}
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
      {/* <pre>{JSON.stringify(response.data, null, 2)}</pre> */}
    </>
  );
}
