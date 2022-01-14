
const request = require('request')
const geocode = (address, callback) => {
    const urlLocation = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2FtaWwxMDUiLCJhIjoiY2t5NXNrNzRhMDllODJwcGZkYzZjcHk5eSJ9.PW-D7cFm9jtTVCm9WVP2hg&limit=1"
    request({ url: urlLocation, json: true }, (error, Response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined)
        }
        else if (Response.body.features.length === 0) {
            callback("Unable to find location", undefined)
        }
        else {
            const data = {
                latitude: Response.body.features[0].center[1],
                longitude: Response.body.features[0].center[0],
                location: Response.body.features[0].place_name
            }
            callback(undefined,data)

        }

    })

}
module.exports=geocode