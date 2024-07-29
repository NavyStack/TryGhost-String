const stripInvisibleChars = require('./strip-invisible-chars');

/**
 * Slugify
 *
 * Prepares a string for use in a URL.
 *
 * -param {String} string - the string we want to slugify
 * -param {object} options - filter options
 * -param {boolean} [options.requiredChangesOnly] - don't perform optional cleanup, e.g., removing extra dashes
 * -returns {String} slugified string
 */
module.exports = function (string = '', options = {}) {
    // Normalize the string to NFC
    string = string.normalize('NFKD');

    // Log the string before stripping invisible characters
    console.log('Before stripInvisibleChars:', string);

    // Strip all characters that cannot be printed
    string = stripInvisibleChars(string);

    // Log the string after stripping invisible characters
    console.log('After stripInvisibleChars:', string);

    // Handle special characters and clean up the string
    string = string
        .replace(/£/g, '-')                          // Replace £ symbol with dash
        .replace(/✓/g, '')                          // Remove check mark
        .replace(/’|‘|“|”|'|{|}/g, '')                   // Replace smart quotes and apostrophes with space
        .replace(/÷/g, '-')                          // Replace ÷ symbol with dash
        .replace(/@/g, '-')                          // Replace @ symbol with dash
        .replace(/[\s\.\:\?\/\#\[\]!$&()*+;,=\\%<>\|^~"`_]/g, '-') // Replace various special characters with dash
        .replace(/[\u00A0]/g, '-')                    // Replace non-breaking space with dash
        .replace(/[\u2000-\u206F]/g, '-')             // Replace punctuation characters in the range 2000-206F with dash
        .replace(/[\u2E00-\u2E7F]/g, '-')             // Replace additional punctuation characters in the range 2E00-2E7F with dash
        .replace(/[\u3000-\u303F]/g, '-')             // Replace CJK symbols and punctuation characters in the range 3000-303F with dash
        .replace(/[\uFE00-\uFE0F]/g, '-')             // Replace variation selectors in the range FE00-FE0F with dash
        .replace(/[\uFF00-\uFFEF]/g, '-')             // Replace full-width forms in the range FF00-FFEF with dash
        .toLowerCase();                             // Convert to lowercase

    // Optional cleanup: convert multiple dashes to a single dash and remove leading/trailing dashes
    if (!options.requiredChangesOnly) {
        string = string
            .replace(/-+/g, '-')   // Convert multiple dashes to a single dash
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
    }

    // Trim whitespace from the beginning and end
    return string.trim();
};
