const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
//firebase login เชื่อต่อ firebase
//firebase emulators:start เริ่มใช้งานโปรเเกรม
//token cli : 0gH9twL1O3ehzCgYIARAAGBASNwF-L9IrBfkKG3U-qvKj_H3PH5iFfIQoubovOWR2htQUdMHEx0KXLSuYFXdyauBcsbpVGoav0bg
// 0. npm install axios-
// 1. Import template and util
  const template = require ('./template');
  const util = require ('./util');
// 2. Fill in your CHANNEL ACCESS TOKEN in util.js

exports.myWebhook = functions.https.onRequest(async (request, response) => {
  const events = request.body.events;

  for (const event of events) {
    // 3. Detect beacon event
    if (event.type === "beacon") {
      // 4. Log body payload
      functions.logger.info("BODY", request.body)
      // 5. Get userId

      const userId = event.source.userId;
      // 6. Get user profile
      const profile = await util.getUserProfile(userId);
      console.log("PROFILE", profile)
      // 7. Detect beacon type
      switch (event.beacon.type) {
        // 8. If beacon type is enter then reply with Flex message
        //case "enter" :
        //  let msg = template.enter1(profile);
        //  await util.reply(event.replyToken, [msg]);
        //  break;
        // 9. Replying personal messages separated by each device

        // 10. Create a Rich Menu then fill in your RICH MENU ID in util.js
        // 11. If beacon type is banner then link a personal Rich Menu to user
        case "banner":
            await util.richMenuLink(userId);
            break;
        // 12. If beacon type is stay then write user profile to database
        case "stay":
            await util.addBeaconUser(profile);
            break;
      }
    }
  }

  response.end();
});
