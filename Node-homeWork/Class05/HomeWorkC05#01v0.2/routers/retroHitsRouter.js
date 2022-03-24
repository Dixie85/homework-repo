const express = require("express");
const router = express.Router();
const emitter = require("./../datalogger/logger")


router.get("/week_hits", (req,res)=>{
    emitter.emit("hits-visites");
    res.send(`
    <p>
    <h1>------This week Retro Hits------</h1>
    <ul>
        <li>Wake Me Up Before You Go-GoWham!</li>
        <li>Girls Just Want to Have FunCyndi Lauper.</li>
        <li>Never Gonna Give You UpRick Astley.</li>
        <li>Eye of the TigerSurvivor.</li>
        <li>GhostbustersRay Parker Jr.</li>
        <li>Party All the TimeEddie Murphy.</li>
        <li>Walk Like an EgyptianThe Bangles.</li>
        <li>Livin' on a Prayer.</li>
        <li>how deep is your love.</li>
    </ul>
    </p>        
`);
});

module.exports = router;