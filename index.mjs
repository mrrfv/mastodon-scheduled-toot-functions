import 'dotenv/config';
import getMessage from "./user/getMessage.mjs";
import { scheduleJob } from 'node-schedule';

// Sends a Mastodon post
async function toot(message, instance, user_token, visibility = 'unlisted') {
    // Define the status parameters
    const statusParams = {
        status: message, // The text content of the status
        visibility, // The visibility of the status
        // Other parameters are optional, see https://docs.joinmastodon.org/methods/statuses/
    };

    // Define the API endpoint for posting a status
    const postStatusURL = `${instance}/api/v1/statuses`;

    // Make a POST request with node-fetch
    const res = await fetch(postStatusURL, {
        method: 'POST', // Specify the HTTP method
        headers: {
            'Authorization': `Bearer ${user_token}`, // Example: Bearer 1234567890abcdef
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(statusParams), // Convert the status parameters to JSON string
    });

    // Parse the response as JSON
    return res.json();
}

// Main
async function main() {
    try {
        const message = await getMessage();
        console.log(`Posting message: ${message}`);
        if (process.env.DRY_RUN) return console.log('Dry run, not posting.');
        const res = await toot(message,
            process.env.MASTODON_INSTANCE_URL,
            process.env.MASTODON_USER_TOKEN,
            process.env.MASTODON_STATUS_VISIBILITY);
        console.log(`Posted: ${res.url}`);
    } catch (err) {
        console.error(err);
    }
}

console.log("Bot started! A toot will be posted according to the schedule.");
console.log(`Your current schedule: ${process.env.CRON_SCHEDULE}`);
// Set an interval to run the main function according to the schedule
scheduleJob(process.env.CRON_SCHEDULE, () => {
  main();
});