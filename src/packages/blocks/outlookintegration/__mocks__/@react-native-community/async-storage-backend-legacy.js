class LegacyStorage {
  async getItem(key) {
    return 'mocked value';
  }

  async setItem(key, value) {
    return 'mocked value';
  }

  async removeItem(key) {
    return 'mocked value';
  }

  async getAllKeys() {
    return ['mocked key'];
  }

  async multiGet(keys) {
    return [['mocked key', 'mocked value']];
  }

  async multiSet(keyValuePairs) {
    return 'mocked value';
  }

  async multiRemove(keys) {
    return 'mocked value';
  }

  async clear() {
    return 'mocked value';
  }
}

export default LegacyStorage;