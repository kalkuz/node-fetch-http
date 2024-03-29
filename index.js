import fetch from 'node-fetch';

const config = {
  api: '',
  getAuthorization: () => '',
};

function HeaderBuilder(header, body) {
  const headers = {
    ...header,
    ...(body ? { 'Content-Type': 'application/json' } : null),
    ...(config.getAuthorization() ? { authorization: config.getAuthorization() } : null),
  };

  return headers;
}

async function Handler(res) {
  const json = await res.json();

  if (!res.ok) {
    throw json;
  } else {
    return json;
  }
}

export async function Get(endpoint, header = null, optionalApiAddress = null) {
  const address = `${optionalApiAddress || config.api}${endpoint}`;

  return fetch(address, { method: 'GET', headers: HeaderBuilder(header) })
    .then(Handler);
}

export async function Post(endpoint, body, header = null, optionalApiAddress = null) {
  const address = `${optionalApiAddress || config.api}${endpoint}`;

  return fetch(address, { method: 'POST', body: JSON.stringify(body), headers: HeaderBuilder(header, body) })
    .then(Handler);
}

export async function Patch(endpoint, body, header = null, optionalApiAddress = null) {
  const address = `${optionalApiAddress || config.api}${endpoint}`;

  return fetch(address, { method: 'PATCH', body: JSON.stringify(body), headers: HeaderBuilder(header, body) })
    .then(Handler);
}

export async function Put(endpoint, body, header = null, optionalApiAddress = null) {
  const address = `${optionalApiAddress || config.api}${endpoint}`;

  return fetch(address, { method: 'PUT', body: JSON.stringify(body), headers: HeaderBuilder(header, body) })
    .then(Handler);
}

export async function Delete(endpoint, body, header = null, optionalApiAddress = null) {
  const address = `${optionalApiAddress || config.api}${endpoint}`;

  return fetch(address, { method: 'DELETE', body: JSON.stringify(body), headers: HeaderBuilder(header, body) })
    .then(Handler);
}

function Configurate(api = '', getAuthorization = () => '') {
  config.api = api;
  config.getAuthorization = getAuthorization;
}

export default { Configurate };
