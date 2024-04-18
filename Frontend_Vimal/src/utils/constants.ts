const resourcePath =
  window.location.protocol +
  "//" +
  window.location.hostname +
  (window.location.port ? ":" + window.location.port : "");

export const icons = {
  appNavBar: {
    logo: resourcePath + "/assets/images/image.png"
  }
}
