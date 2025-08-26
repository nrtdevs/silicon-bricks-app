// export enum Env {
//     DOMAIN = '192.168.1.32:5001',
//     BASE_URL = `http://${DOMAIN}/graphql`,
//     SERVER_URL = `http://${DOMAIN}`,
//     SOCKET_URL = `wss://${DOMAIN}/wss2/:8090`,
//     IMAGEURL = `http://192.168.1.32:5001`,
//     IMAGE_UPLOAD = `http://192.168.1.32:5001/api/files/upload`,
//     LIMIT = 25
// }

export enum Env {
    // DOMAIN = '192.168.1.33:5001',
    // BASE_URL = `http://${DOMAIN}/graphql`,
    // SERVER_URL = `http://${DOMAIN}`,
    // SOCKET_URL = `wss://${DOMAIN}/wss2/:8090`,
    // IMAGEURL = `http://192.168.1.33:5001`,
    // IMAGE_UPLOAD = `http://192.168.1.33:5001/api/files/upload`,
    // LIMIT = 25

    DOMAIN = 'gateway.siliconbricks.in',
    BASE_URL = `https://${DOMAIN}/graphql`,
    SERVER_URL = `http://${DOMAIN}`,
    SOCKET_URL = `wss://${DOMAIN}/wss2/:8090`,
    IMAGEURL = `https://gateway.siliconbricks.in`,
    IMAGE_UPLOAD = `https://gateway.siliconbricks.in/api/files/upload`,
    LIMIT = 25
}
