export const validators = (email: string, password: string): Array<string> | any => {
    // eslint-disable-next-line
    let errors: Array<string> = []

    if (!email) {
        errors.push('Email should be required 🤬')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.push('Invalid email address ❌')
    }
    
    if (!password) {
        errors.push('Password should be required 🤬')
    } else if (password.length < 7) {
        errors.push('Password must be 7 characters or more')
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}