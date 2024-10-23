# Wrap It Up

Have you ever checked on a channel and see 100+ messages? I have, and I always question if I care enough to jump into the conversation or just ignore it.

Well, this bot comes to the rescue. The bot will summarize the last x (number allowed tbd) messages so you have a general idea of what is being discussed.

......will it work, let's find out!

## Goals

High Level roadmap for building this bot.

* [X] ~Connect to Discord server~
* [X] ~Collect message for specific channel.~
* [ ] Add listener for new messages in channel.
* [ ] Updated Discord prompt to allow users to specify number of messages to summarize (current max is 100)
* [ ] Get connected to OpenAPI api.
* [ ] Work on formatting messages we will send to OpenAPI
* [ ] Format OpenAPI response and send back to Discord.
* [ ] Identify method for hosting application.

## Stretch Goals

While I have a general idea of what I want this app to do, I know there are things that could make it easier to distribute and easier to use in other discords.  But in an attempt to not over-engineer this, we are starting small with the goals listed in [Goals](#goals) and will follow up with these stretch goals if we decided this project is worth pursuing.

* [ ] Update app to work for Text and threads.
* [ ] Send summary to users directly via a DM.
  * Not sure if this is the best approach. Maybe others would find it helpful with it posted in the channel
* [ ] Have application dynamically pull messages from a channel
  * Should this be something users configure (i.e. have the bot only work for these channels)
* [ ] Adding cool-down on a per channel or user basis.
* [ ] Add method for receiving feedback on response.
* [ ] Add logging.
* [ ] Add onboarding instructions so that folks can add this to their channels.
