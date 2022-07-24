const { exec } = require("child_process");

for (let i = 3001; i <= 3003; i++) {
  exec(`nodemon api.js ${i}`, console.log(`node on port ${i}`));
}
