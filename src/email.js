// RFC 5322 addr-spec pattern from https://emailregex.com/ (General Email Regex)
// with IPv4 literal fix from https://stackoverflow.com/a/201378
const RFC5322_EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

function extractEmails(members) {
    if (!Array.isArray(members)) {
        return [];
    }
    return members.map(member => member.email);
}

function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    return RFC5322_EMAIL_REGEX.test(email);
}

function getValidEmails(members) {
    return extractEmails(members).filter(isValidEmail);
}

/**
 * 이메일 주소에서 도메인 부분을 추출한다.
 * @param {string} email - 이메일 주소
 * @returns {string|null} 도메인 문자열. 유효하지 않으면 null
 */
function extractEmailDomain(email) {
    if (typeof email !== 'string' || !isValidEmail(email)) {
        return null;
    }
    const atIndex = email.lastIndexOf('@');
    return email.slice(atIndex + 1);
}

module.exports = {
    extractEmails,
    isValidEmail,
    getValidEmails,
    extractEmailDomain,
};
