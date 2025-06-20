export enum Env {
    DOMAIN = '192.168.1.15:5001',
    BASE_URL = `http://${DOMAIN}/graphql`,
    SERVER_URL = `http://${DOMAIN}`,
    SOCKET_URL = `wss://${DOMAIN}/wss2/:8090`,
    IMAGEURL = `http://192.168.1.15:5001`,
    IMAGE_UPLOAD = `http://192.168.1.15:5001/api/files/upload`,
    LIMIT = 25
}