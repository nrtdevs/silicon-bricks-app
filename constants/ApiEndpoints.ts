export enum Env {
  DOMAIN = "192.168.1.67:5001",
  BASE_URL = `http://${DOMAIN}/graphql`,
  SERVER_URL = `http://${DOMAIN}`,
  IMAGEURL = `http://192.168.1.67:5001`,
  IMAGE_UPLOAD = `http://192.168.1.67:5001/api/files/upload`,
  LIMIT = 25,

  // DOMAIN = "gateway.siliconbricks.in",
  // BASE_URL = `https://${DOMAIN}/graphql`,
  // SERVER_URL = `http://${DOMAIN}`,
  // IMAGEURL = `https://gateway.siliconbricks.in`,
  // IMAGE_UPLOAD = `https://gateway.siliconbricks.in/api/files/upload`,
  // LIMIT = 25,
}
