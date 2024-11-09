# Wrap It Up

Have you ever checked on a channel and see 100+ messages? I have, and I always question if I care enough to jump into the conversation or just ignore it.

Well, this bot comes to the rescue. The bot will summarize the last x (number allowed tbd) messages so you have a general idea of what is being discussed.

......will it work, let's find out!

## Goals

High Level roadmap for building this bot.

- [x] ~Connect to Discord server~
- [x] ~Collect message for specific channel.~
- [x] ~Add listener for new messages in channel.~
- [x] ~Updated Discord prompt to allow users to specify number of messages to summarize (current max is 100)~
- [x] Get connected to OpenAP api.
- [x] Work on formatting messages we will send to OpenAI
- [x] Format OpenAI response and send back to Discord.
- [ ] Have application dynamically pull messages from a channel
  - Should this be something users configure (i.e. have the bot only work for these channels)
- [ ] Identify method for hosting application.
- [ ] Add tests
- [ ] Add pre-commit hook to check linting
- [ ] Update API to work for any channel that is compatible.
- [ ] Update API to fetch the number of messages specified

## Stretch Goals

While I have a general idea of what I want this app to do, I know there are things that could make it easier to distribute and easier to use in other discords. But in an attempt to not over-engineer this, we are starting small with the goals listed in [Goals](#goals) and will follow up with these stretch goals if we decided this project is worth pursuing.

- [ ] Update app to work for Text and threads.
- [ ] Send summary to users directly via a DM.
  - Not sure if this is the best approach. Maybe others would find it helpful with it posted in the channel

- [ ] Adding cool-down on a per channel or user basis.
- [ ] Add method for receiving feedback on response.
- [ ] Add logging.
- [ ] Add onboarding instructions so that folks can add this to their channels.
- [ ] Add GitHub Actions
- [ ] Disable pushing to main and setup workflow for pushing updates
- [ ] Update OpenAPI query so that it's more consistent. Some things I've seen are....
      - Messages are structures differently and group differently with each request.
      - ChatGPT is not respecting character limit.
      - Some times includes participates, but sometimes doesn't.
