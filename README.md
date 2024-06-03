## Newsletter App with Novu Echo, Firebase, and React Email

## Prerequisites
1. [Appwrite project](https://appwrite.io/) with an active Database, and a GitHub and Email & Password authentication methods.
2. Access your [GitHub developer account.](https://github.com/settings/developers)
3. [Novu account with an API Key](https://web.novu.co/).
4. [Novu Echo](https://docs.novu.co/echo/quickstart#try-it-now)
5. [Stripe Test Account & Secret Key](https://stripe.com/)

## Getting Started

1. Clone the repository
2. Install the project dependences
```bash
npm install
```
3. Create a Appwrite project and activate the GitHub, and Email & Password authentication methods.
4. You can get your GitHub client ID and secret ID [here](https://github.com/settings/developers).
5. Create a `.env.local` file containing the following credentials.
   ```txt
   NEXT_PUBLIC_PROJECT_ID=<YOUR_APPWRITE_PROJECT_ID>
   NEXT_PUBLIC_DB_ID=<YOUR_APPWRITE_DATABASE_ID>
   NEXT_PUBLIC_PRODUCTS_COLLECTION_ID=<YOUR_APPWRITE_COLLECTION_ID>
   NEXT_PUBLIC_BUCKET_ID=<YOUR_APPWRITE_BUCKET_ID>
   STRIPE_SECRET_KEY=
   NOVU_API_KEY=
   NOVU_SUBSCRIBER_ID=
   NEXT_PUBLIC_NOVU_API_KEY=
   NEXT_PUBLIC_NOVU_APP_ID=
   NEXT_PUBLIC_NOVU_SUBSCRIBER_ID=
   ```
6. Start the development server by running the code snippet below.
   ```bash.
    npm run dev
   ```
7. Set up [Novu Echo](https://docs.novu.co/echo/quickstart#try-it-now) and the workflow URL is `<your_unique_url>/api/email`
     ```bash
     npx novu-labs@latest echo
    ```
8. Ensure, you have set up an Email service provider on your Novu dashboard

    
