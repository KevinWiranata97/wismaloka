const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-XgJt9TioouGdXczOivp_V73D",
  clientKey: "SB-Mid-client-TIKi60BQSz600yNN",
});

module.exports = snap;
