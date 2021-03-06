import { check } from 'meteor/check';
import Meetings from '/imports/api/meetings';
import Logger from '/imports/startup/server/logger';

import { clearUsersCollection } from '/imports/api/users/server/modifiers/clearUsersCollection';
import clearChats from '/imports/api/chat/server/modifiers/clearChats';
import { clearShapesCollection } from '/imports/api/shapes/server/modifiers/clearShapesCollection';
import { clearSlidesCollection } from '/imports/api/slides/server/modifiers/clearSlidesCollection';
import { clearPollCollection } from '/imports/api/polls/server/modifiers/clearPollCollection';
import { clearCursorCollection } from '/imports/api/cursor/server/modifiers/clearCursorCollection';
import { clearCaptionsCollection }
  from '/imports/api/captions/server/modifiers/clearCaptionsCollection';
import { clearPresentationsCollection }
  from '/imports/api/presentations/server/modifiers/clearPresentationsCollection';

export default function removeMeeting(meetingId) {
  check(meetingId, String);

  const selector = {
    meetingId,
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`Removing meeting from collection: ${err}`);
    }

    if (numChanged) {
      clearCaptionsCollection(meetingId);
      clearChats(meetingId);
      clearCursorCollection(meetingId);
      clearPollCollection(meetingId);
      clearPresentationsCollection(meetingId);
      clearShapesCollection(meetingId);
      clearSlidesCollection(meetingId);
      clearUsersCollection(meetingId);

      return Logger.info(`Removed meeting id=${meetingId}`);
    }
  };

  return Meetings.remove(selector, cb);
};
