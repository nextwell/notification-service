//----------------------------------------------------------------------------------------
// Get Public Key

module.exports = (app, db) => {
	app.get("/api/publickey", (req, res) => {
		let data = {
			publicKey: process.env.publicVapidKey || "BJ7dGWBlWRm4t3rQ3dcac0nNkDZqy1AHp00HTckcPNYyypDz4cuVmDe81KwdrQ6B7BPVuFMuigMR7wy6jc2haBE"
		}
		res.json(data);
	  

	});
}