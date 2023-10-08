# Mastodon Scheduled Toot Bot (Functions Version)

Rewrite of Mastodon Scheduled Toot, my previous project, with a few improvements such as better error handling and a better way of generating toots - instead of using a list of them, it runs an user-defined function that returns the post content. This allows for more flexibility.

## Basic usage instructions

1. Clone this repository
2. Install dependencies with `npm i`
3. Copy `.env.example` to `.env` and fill in the details
4. Go to `user/getMessage.mjs` and edit the function to generate your toots
5. Run with `node index.mjs`
