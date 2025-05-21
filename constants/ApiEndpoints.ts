export enum Env  {
    DOMAIN = '192.168.1.50:5001',
    BASE_URL = `http://${DOMAIN}/graphql`,
    SERVER_URL = `http://${DOMAIN}`,
    SOCKET_URL = `wss://${DOMAIN}/wss2/:8090`,
    LIMIT = 25
}