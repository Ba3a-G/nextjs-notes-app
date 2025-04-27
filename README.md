# Next.js Middleware Bypass Vulnerability POC

This project serves as a Proof of Concept (POC) to demonstrate a potential middleware bypass vulnerability in NextJS applications.

## Purpose

The primary goal of this repository is to illustrate how certain configurations or specific request patterns might lead to the circumvention of middleware logic defined in `src/middleware.ts`.

## Running the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nextjs-notes-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Set up environment variables:**
    Copy the example environment file and fill in the required values:
    ```bash
    cp .example.env .env
    ```
    Then, edit the `.env` file with your specific credentials, particularly `NEXTAUTH_SECRET` as required by `src/middleware.ts`.
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> [!WARNING]
> **Disclaimer:** This POC is intended for educational and research purposes only. Do not use this code or the demonstrated techniques for any malicious activities. Exploiting vulnerabilities without authorization is illegal and unethical. If you discover vulnerabilities in Next.js or any other software, please follow responsible disclosure practices by reporting them to the maintainers.

---

*POC created by Ba3a.*
*Find more on GitHub: [ba3a-g](https://github.com/ba3a-g)*