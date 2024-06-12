export const generateBankCode = () => {
    let digits = '0123456789';
    let bankcode = '';
    for (let i = 0; i < 6; i++) {
        bankcode += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    return bankcode;
}

export const generateBankAccountNumber = () => {
    let digits = '0123456789';
    let accountNumber = '';
    for (let i = 0; i < 10; i++) {
        accountNumber += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    return accountNumber;
}

export const generateTheme = (country) => {
    switch (country) {
        default:
            return {
                primary: '#64B5F6',
                secondary: '#1976D2',
                background: '#0b2a39',
                text: '#fff',
                error: '#FF5722',
                hover: '#94b512'
            };
    }
};

