# Is My Internet Down?

A script and remote server used to report on whether your home network connection is working or not.

Comprised of two parts:

-   Client Python script meant to be run regularly as a cron job on your home network
-   Remote Node server that will display when the last successfull ping from the client was received

Setup:

    cp .env.dist .env
    // Then fill out necessary details & credentials

    python3 -m pip install -r client/requirements.txt
    npm install
    npm run start

    // Add to crontab:
    */10 * * * * python3 client/check-in.py [Name of device]
