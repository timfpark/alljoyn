# Nitrogen AllJoyn Gateway

The Nitrogen/AllJoyn gateway enables AllJoyn devices to interact with a Nitrogen service. AllJoyn devices implementing known interfaces will be discovered and provisioned in Nitrogen. Applications and other devices can send Nitrogen messages to a AllJoyn device and the gateway will translate these into RPC calls against the Alljoyn device.

## Running the bridge:

1. Clone or fork this repo: `https://github.com/timfpark/alljoyn`
2. Fetch and install its node.js dependencies: `npm install`
3. Edit `config.js` to change defaults as necessary.
4. `npm start`