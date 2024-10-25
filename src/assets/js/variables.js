/*eslint-disable*/

const isProd = process.env.NODE_ENV === 'production' ? 'production' : 'develop'
export const AppUrl = `http://chasma.eu/client_console/${isProd}/console/api/managementController`
