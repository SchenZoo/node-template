function normalizeValue(value) {
  // :TODO add dates filter
  // :TODO add number filters
  switch (value) {
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch (e) {}
      }
      return value;
  }
}

module.exports = {
  normalizeValue,
};
