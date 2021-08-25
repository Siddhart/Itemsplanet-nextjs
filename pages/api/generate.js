require("dotenv").config();

import { generateeverythingboi } from "../../generateChunks";

export default function handler(req, res) {
  console.log(req.query.key);
  if (req.query.key && req.query.key == process.env.KEY) {
    res.status(200).json({ code: 200 });
    generateeverythingboi();
  }else{
    res.status(403).json({ error:  "Missing access"});
  }
}
