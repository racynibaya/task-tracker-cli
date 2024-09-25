# Task Tracker CLI

Task Tracker CLI is a simple command-line application built using Node.js that allows users to manage tasks. The app supports adding tasks, marking tasks as "in-progress" or "done," and listing tasks by status.

Task tracker cli app. More info can be found here:
[https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)

## Installation

### Prerequisites

Ensure you have Node.js installed. If not, you can download it from [here](https://nodejs.org).

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/task-tracker-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker-cli
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

To run the Task Tracker CLI, use the following syntax:

```bash
node index.js [command] [arguments]
```

## Commands

### `add [description]`

Adds a new task with the provided description.

```bash
node index.js add "This is a new task"
```

### `mark-in-progress [task ID]`

Marks the task with the given ID as "in-progress".

```bash
node index.js mark-in-progress 3
```

### `mark-done [task ID]`

Marks the task with the given ID as "done".

```bash
node index.js mark-done 3
```

### `list [status]`

Lists tasks based on their status. If no status is provided, it lists all tasks. Available statuses are:

- `done`
- `in-progress`
- `todo`

```bash
node index.js list done
```

### `help`

Displays the help information with available commands and their usage.

```bash
node index.js help
```

## Data Storage

The task data is stored in a JSON file (`data.json`) in the project directory. Make sure this file exists or will be generated upon the first task addition.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
