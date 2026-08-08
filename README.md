# Fusion Documentation

Welcome to the **Fusion team!** 👋

We are building the official documentation website for **Fusion Framework**.

The goal of this project is to create clear, complete, and accessible documentation for Fusion — and we'd be happy to have your help!

You can contribute in different ways:

* 📝 Write or improve documentation
* 🌍 Translate documentation into other languages
* 🐛 Fix documentation bugs
* 🎨 Improve the documentation website
* 💡 Suggest improvements
* 🔍 Find and report mistakes
* ⚡ Improve performance or accessibility

Every contribution is appreciated. ❤️

---

## 🚀 Getting Started

### Requirements

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [pnpm](https://pnpm.io/)

This project uses **pnpm 11.5.2**.

You can check your versions with:

```bash
node --version
pnpm --version
```

---

## 📦 Clone the Repository

Clone the repository:

```bash
git clone https://github.com/cipherunits/fusion-docs.git
```

Move into the project directory:

```bash
cd fusion-docs
```

Install dependencies:

```bash
pnpm install
```

---

## 💻 Run the Development Server

Start the development server:

```bash
pnpm dev
```

The documentation website will be available at:

```text
http://localhost:3000
```

The development server automatically reloads when you make changes.

---

## 🏗️ Build the Project

To create a production build:

```bash
pnpm build
```

To run the production build:

```bash
pnpm start
```

---

## 🔎 Lint

Before submitting your changes, run:

```bash
pnpm lint
```

Please make sure there are no lint errors before opening a Pull Request.

---

# 🌍 Contributing Translations

One of the most valuable ways to help Fusion is by translating its documentation.

If you want to contribute a translation:

1. Clone the repository.
2. Install the dependencies.
3. Create or edit the appropriate translation files.
4. Translate the content while keeping the original meaning and technical terminology.
5. Run the project locally and check the translated pages.
6. Run the lint command.
7. Commit your changes.
8. Push your branch.
9. Open a Pull Request.

### Translation Guidelines

When translating Fusion documentation:

* Keep the meaning of the original text.
* Do not translate code.
* Do not translate variable names, function names, API names, or file paths.
* Keep technical terms consistent throughout the documentation.
* Make sure links continue to work.
* Preserve Markdown/MDX syntax.
* Check the final result in the browser.
* Avoid machine translations without reviewing and correcting them.

For example, this:

````md
Install the package using:

```bash
pnpm add fusion
````

````

should keep the command unchanged.

---

# 🛠️ Contributing to the Website

You can also contribute directly to the documentation website.

Some examples:

- Fixing UI issues
- Improving responsive layouts
- Improving accessibility
- Adding components
- Improving navigation
- Fixing broken links
- Improving documentation search
- Improving performance

Before making a large change, it is recommended to open an Issue first so the team can discuss the idea.

---

# 🌿 Branching

Please avoid making changes directly on the `main` branch.

Create a new branch for your work:

```bash
git checkout -b docs/my-change
````

For example:

```bash
git checkout -b docs/add-installation-guide
```

or:

```bash
git checkout -b i18n/persian
```

---

# 💾 Commits

Please keep commit messages clear and meaningful.

Examples:

```text
docs: add installation guide
```

```text
docs: fix broken links
```

```text
i18n: add Persian translation
```

```text
fix: correct mobile navigation
```

---

# 🔃 Pull Requests

When your work is ready:

```bash
git add .
git commit -m "docs: improve installation guide"
git push origin docs/my-change
```

Then open a **Pull Request** on GitHub.

In your Pull Request description, briefly explain:

* What you changed
* Why you changed it
* Which language or section you worked on, if applicable
* Any additional information the reviewers should know

Please make sure the project builds successfully and lint passes before submitting your PR.

---

# 🤝 Contribution Workflow

A typical contribution looks like this:

```text
Fork / Clone
     ↓
Create a branch
     ↓
Make your changes
     ↓
Run the project
     ↓
Check your changes
     ↓
Run lint / build
     ↓
Commit
     ↓
Push
     ↓
Open a Pull Request
     ↓
Review
     ↓
Merge 🎉
```

---

# 💙 Thank You

Whether you fix a typo, translate an entire section, improve the UI, or contribute a completely new feature — **thank you for helping us make Fusion better.**

Welcome to the team, and happy contributing! 🚀

---

## 🔗 Links

* **Fusion Documentation:** Coming soon
* **Fusion Framework:** Coming soon
* **GitHub Repository:** https://github.com/cipherunits/fusion-docs
