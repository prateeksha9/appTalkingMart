const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: "xoxb-2919951544608-2881837595367-E4cFGPdvCL1zbH7myp4pNQD5",
  signingSecret: "cbad69c800b3c3c2e8ceabb6595df855",
  socketMode: true,
  appToken:
    "xapp-1-A02SCD45ZMY-2891247780694-921b7ed6fcc2067dd0bfe1b3a52a1935d4ba30026d654b90373f4c11bbb100e7",
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
  const port = process.env.PORT || 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
