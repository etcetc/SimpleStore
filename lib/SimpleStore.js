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

  set(key,item) {
    if ( this.items[key] != item ) {
      this.items[key] = item;
      this._save();
    }
  }

  delete(key) {
    if ( this.has(key) ) {
      delete this.items[key];
      this._save();
    }
  }

  get(key) {
    return this.items[key];
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
