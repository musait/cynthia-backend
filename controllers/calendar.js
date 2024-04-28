const { google } = require('googleapis');
const auth = require('./auth');

function listEvents(oauth2Client, callback) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return callback(err);
    const events = res.data.items;
    callback(null, events);
  });
}

module.exports = {
  listEvents
};
