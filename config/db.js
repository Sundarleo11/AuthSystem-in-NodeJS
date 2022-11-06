const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;


exports.connect = () => {

    mongoose.connect(MONGODB_URL, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    })
        .then(console.log(`DB connection successsfully`))
        .catch((error) => {
            console.log('DB connection Failed');
            console.log(error);
            process.exit(1);
        });

};
