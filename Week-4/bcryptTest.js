const bcrypt = require('bcryptjs');


const testBcrypt = async () => {
    const password = 'admin1234';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Compare the password with the hash
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password Match:', isMatch);
};

testBcrypt();
