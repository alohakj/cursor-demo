const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { extractEmails, isValidEmail, getValidEmails, extractEmailDomain } = require('./email');

describe('extractEmails', () => {
    it('returns emails from member objects', () => {
        const members = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
        ];
        assert.deepEqual(extractEmails(members), ['alice@example.com', 'bob@example.com']);
    });

    it('returns empty array for non-array input', () => {
        assert.deepEqual(extractEmails(null), []);
        assert.deepEqual(extractEmails(undefined), []);
    });
});

describe('isValidEmail', () => {
    it('accepts RFC 5322 compliant addresses', () => {
        assert.equal(isValidEmail('user@example.com'), true);
        assert.equal(isValidEmail('user+tag@example.com'), true);
        assert.equal(isValidEmail('"quoted"@example.com'), true);
        assert.equal(isValidEmail('user@[192.168.1.1]'), true);
    });

    it('rejects invalid values', () => {
        assert.equal(isValidEmail('not-an-email'), false);
        assert.equal(isValidEmail('user@domain'), false);
        assert.equal(isValidEmail('user@[256.1.1.1]'), false);
        assert.equal(isValidEmail('user@[00.1.1.1]'), false);
        assert.equal(isValidEmail(''), false);
        assert.equal(isValidEmail(null), false);
    });
});

describe('getValidEmails', () => {
    it('returns only valid emails', () => {
        const members = [
            { email: 'good@example.com' },
            { email: 'bad-email' },
            { email: 'also@valid.org' },
            { email: null },
        ];
        assert.deepEqual(getValidEmails(members), ['good@example.com', 'also@valid.org']);
    });

    it('returns empty array for non-array input', () => {
        assert.deepEqual(getValidEmails('invalid'), []);
    });
});

describe('extractEmailDomain', () => {
    it('returns domain from valid email', () => {
        assert.equal(extractEmailDomain('user@example.com'), 'example.com');
        assert.equal(extractEmailDomain('user+tag@mail.example.org'), 'mail.example.org');
        assert.equal(extractEmailDomain('"quoted"@example.com'), 'example.com');
        assert.equal(extractEmailDomain('user@[192.168.1.1]'), '[192.168.1.1]');
    });

    it('returns null for invalid input', () => {
        assert.equal(extractEmailDomain('not-an-email'), null);
        assert.equal(extractEmailDomain(''), null);
        assert.equal(extractEmailDomain(null), null);
    });
});
