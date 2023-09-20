const express = require("express");
const router = express.Router();
const { isAuthencated, issellor } = require("../middleware/auth");
const upload = require("../util/fileUpload");

const User = require("../models/user");

router.post("/create",  async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err)
        }

        const { name, price } = req.body;

        if (!name || !price || !req.file) {
            return res.status(400).json({
                err: "fail either name ,price, filereq"
                
            })
            if (Number.isNaN(price)) {
                 return res.status(400).json({
                   err: "price should be number",
                 });
                
                let productDetails = {
                    name,
                    price,
                    content:req.file.path
                }
                return res.status(200).json({
                  status: Ok,
                  productDetails,
                });
    
}

        }
})
});

module.exports = router;