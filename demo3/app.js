var request = require("request");

var options = {
  method: "POST",
  url: "https://www.arcgis.com/sharing/rest/oauth2/token",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  form: {
    client_id: "YOxvQxtk4ablzmyF",
    client_secret: "81b6c37ed2774ef9980a2dd0c7d4a51d",
    grant_type: "client_credentials",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
