# QuizHub

A simple quiz web app built with plain **HTML, CSS and JavaScript** (no frameworks, no build step). Users log in, take quizzes on six subjects, create their own public quizzes, and track their scores on a dashboard.

## Features

- **Login / Register:** account creation and login, required before using the app.
- **Home page:** six subject quizzes (Java, Spring Boot, DSA, OOPs, DBMS, JavaScript) with 30 questions each, plus a "Community quizzes" section.
- **Create a quiz:** add a title, choose a subject, and add or remove questions (4 options each, one correct answer, up to 30 questions). Every quiz you publish is visible to all users.
- **Take a quiz:** answer all questions, submit, and see your score with a review (correct answers in green, wrong answers in red).
- **Dashboard:** every attempt with score, percentage, date and a Retake link, plus attempts, average score, best score and quizzes created.
- **Question shuffling:** the question order of the built-in quizzes is shuffled on every attempt.

## Tech stack

| Part | Technology |
|------|------------|
| Structure | HTML5 |
| Styling | CSS3 (responsive) |
| Logic | Vanilla JavaScript |
| Storage | Browser `localStorage` |

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   ```
2. Open `quizhub.html` in any modern browser. No installation or server is needed.
3. Create an account, then pick a subject and start a quiz.

## Project structure

```
quizhub/
├── quizhub.html   # the whole app: markup, styles and scripts
└── README.md
```

## How it works

The app is a single page that switches views using the URL hash:

| Route | View |
|-------|------|
| `#login` | Login and register |
| `#home` | Subjects and community quizzes |
| `#quiz/<id>` | Take a quiz |
| `#create` | Create a quiz |
| `#dashboard` | Your attempts and stats |

Data is saved in `localStorage` under these keys:

- `qh_users`: registered accounts
- `qh_session`: the logged-in user
- `qh_quizzes`: quizzes created by users (always public)
- `qh_attempts`: every quiz attempt with its score

## Adding more questions

Built-in questions live in the `SUBJECTS` array in `quizhub.html`. Add a line to a subject's list in this format:

```
Question|Option A|Option B|Option C|Option D|index of the correct option (0-3)
```

Each attempt uses 30 questions (`QUIZ_SIZE`). With exactly 30 questions in a subject, all of them are asked in a shuffled order. If a subject has more than 30, each attempt picks 30 at random.

## Limitations

- Data is stored in each user's own browser, so quizzes and scores are **not shared across devices or browsers**.
- Passwords are stored as plain text in `localStorage`. This is for demonstration only and is not secure.

## Future improvements

- Move storage to a backend (for example Spring Boot with a database) so quizzes are truly shared between users.
- Hash passwords and add proper authentication.
- Add timers, categories and a leaderboard.
- Allow editing and deleting your own quizzes.

## License

This project is for learning purposes. Add a license of your choice (for example MIT) before publishing.
