const fs = require('fs')

function error(...errs) {
  console.log('ERROR',...errs);
}

class SimpleStore {
  constructor(domain,options={}) {
    this.domain = domain;
    this.path = options.path || '.'
    this.filepath = this.path.replace(/\/+$/,'') + '/' + this.domain + '.sdb'
    this.items = {}
    if ( fs.existsSync(this.filepath) ) {
      try {
        this.items = JSON.parse(fs.readFileSync(this.filepath))
      } catch (err) {
        error('Unable to parse contents of file',this.filepath,err)
      }
    }
  }

  /**
   *
   * @param {string} key - key identifying the object to remove from store
   * @param {any} item - item to store associated with that key
   * @returns {none} - no return
   */
  set(key,item) {
    if ( this.items[key] != item ) {
      this.items[key] = item;
      this._save();
    }
  }

  /**
   *
   * @param {string} key - key identifying the object to remove from store
   * @returns {none} - no return
   */
  delete(key) {
    if ( this.has(key) ) {
      delete this.items[key];
      this._save();
    }
  }

  /**
   *
   * @param {string} key - identifier for the indicated object
   * @returns {any} - whatever was stored in the object
   */
  get(key) {
    return this.items[key];
  }

  /**
   * @returns {Array<string>} - array of keys used in the store
   */
  keys() {
    return Object.keys(this.items)
  }

  has(key) {
    return Object.keys(this.items).includes(key);
  }

  numItems() {
    return Object.keys(this.items).length;
  }

  _save() {
    fs.writeFileSync(this.filepath,JSON.stringify(this.items,null,2));
  }

  clear() {
    this.items = {};
    this._save();
  }
}

module.exports = SimpleStore;
