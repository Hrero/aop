const request = require('request')
 
request.post('http://10.88.151.15:20883/changeScheduleTaskState', JSON.stringify({"name":"simHistotryMonth", "state":4, "appId": "102846", "appKey": "07LZE2Z1G4Qa96it3oIRwDxOyFetKkBM"}), (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }})
