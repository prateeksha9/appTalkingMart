const { App } = require("@slack/bolt");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = new App({
  token: process.env.bot_token,
  signingSecret: process.env.signing_secret,
  socketMode: true,
  appToken:
    process.env.app_token,
});

app.command("/hello", async ({ command, ack, say, event }) => {
  try {
    await ack();
    console.log(command);
    say({
      blocks: [
        {
          type: "divider",
        },
        {
          type: "input",
          element: {
            type: "plain_text_input",
            action_id: "plain_text_input-action",
          },
          label: {
            type: "plain_text",
            text: "Label",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "This is a section block with a button.",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
              emoji: true,
            },
            value: `plain_text_input-action.value`,
            url: "https://talkingmart.herokuapp.com/helloworld",
          },
        },
      ],
    });
    console.log("command");
  } catch (error) {
    console.log("err");
    console.error(error);
    debugger;
  }
});

(async () => {
  // Start your app
  await app.listen(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
