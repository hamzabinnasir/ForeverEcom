import crypto from 'crypto';

export function generateSecureHash(params, integritySalt) {
    // Remove pp_SecureHash if present
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key]) => key !== 'pp_SecureHash')
    );

    // Sort keys alphabetically
    const sortedKeys = Object.keys(filteredParams).sort();

    // Build the message string
    let message = integritySalt;
    sortedKeys.forEach(key => {
        const value = filteredParams[key] !== undefined ? filteredParams[key] : '';
        message += `&${key}=${value}`;
    });

    // Generate SHA-256 hash
    return crypto
        .createHash('sha256')
        .update(message)
        .digest('hex')
        .toUpperCase();
}