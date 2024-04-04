# NarrateMate.ai
Live App: https://narratemate.vercel.app/

NarrateMate.ai is a language learning web application designed to help users practice and improve their foreign language listening comprehension skills. Unlike other apps that focus on grammar, vocab, or speaking, NarrateMate.ai offers a unique approach to language learning by focusing on language listening comprehension. Users can watch YouTube videos in their target language directly within the app, provide summaries in their native language, and receive immediate, personalized feedback on  from ChatGPT. 

## Features
- YouTube Video Integration: Users can input any YouTube URL to watch videos within the NarrateMate.ai app. 
- Summary Submission: After watching a video, users are prompted to submit a summary of what they watched in their native language. This practice reinforces comprehension and recall abilities.
- ChatGPT Feedback: Leveraging OpenAI's ChatGPT, the app provides users with instant feedback on their summaries. This includes comments on missing ideas, correct ideas, and wrong ideas expressed in the user's summary.
- History: Users can look back into their previous submissions and feedback.
- Words: Users can save words that they want to practice when reviewing the video's subtitles.
- Review Words: Users can choose words in their word list to review and practice.

## Getting Started
### Prerequisites
Node.js (v20 or later)
npm (v10 or later)
A modern web browser

## Installation
1. Clone then navigate to the repository
  ```
  git clone https://github.com/yourusername/NarrateMate.ai.git
  cd NarrateMate.ai
  ```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory
```
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_SUPABASE_URL=your_next_public_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_next_public_supabase_anon_key
```

4. Start the application
```
// To run in development mode:
npm run dev

// To run in production mode:
npm run build
npm start
```
The application should now be running on http://localhost:3000. Open your web browser and navigate to this address to start using NarrateMate.ai.

## Usage
- Input a YouTube URL: On "New Video" page, enter a YouTube URL into the input field and submit it to load the video within the app.
- Watch the Video: Use the integrated video player to watch the video. Take notes if necessary.
- Submit a Summary: Below the video player, you'll find a text area where you can type your summary of the video in English.
- Receive Feedback: After submitting your summary, ChatGPT will analyze your input and provide you with detailed feedback on the correct, missing, and wrong ideas in your summary. Each missing or correct idea is associated with a timestamp to where the idea occurs in the video. You can jump to the time in the video by clicking the timestamps.
- View the subtitles: After receiving the feedback, you can view the subtitles and associated timestamps.
- Save words to your words list: In the subtitles, you can click words for their translations and definitions and also add them to your words list.
- Review your history of video summaries and feedback: Navigate to the history page by clicking "History" on the sidebar.
- Review words: Navigate to the "Words" page and review saved words.

## Credits
This project was born out of a coffee chat at the [Recurse Center](https://www.recurse.com/) and flourished through the collaborative efforts of [Pierre-Antoine Bannier](https://github.com/PABannier) and [Justina Cho](https://github.com/justcho5).

## Contributing
We welcome contributions from the community! If you have suggestions for improvements or new features, please feel free to fork the repository, make your changes, and submit a pull request.

## Contact
For support or to report issues, please contact us via GitHub Issues on our repository.
