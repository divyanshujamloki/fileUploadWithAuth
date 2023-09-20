// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const isAuthencated = async (req, res, next) => {
    
//     try {
//         const authHead = req.headers.authorization;
//         if (!authHead) {
//              return res.send(status401).json({
//                err: "authhead not found",
//              });
//         }
//         const token = authHead.split(" ")[1]

//         if (!token) {
//               return res.send(status401).json({
//                 err: "token not found",
//               });
//         }


//         const decoded = jwt.verify(token, "SECRET");
//         const user = await User.findOne({ where: { id: decoded.User.id } })
        
//         if (!user) {
//               return res.send(status401).json({
//                 err: "User not found",
//               });
//         }
//         req.User = user;
//         next();
        
//     } catch(e) {
//         return res.send(status401).json({
//             err:"auhtorization head not found"
//         })
//     }
// };

// const issellor = async (req, res, next) => {
//     try {
//         if (!req.user.datavalues.issellor) {
//               return res.send(status401).json({
//                 err: "NOT Seller ",
//               });
            
//         }

//         return res.send(200).json({
//             msg: "seller varified"
//         })
//         next();
//     } catch(e) {
        
//     }
// }
// module.exports = {isAuthencated,issellor}