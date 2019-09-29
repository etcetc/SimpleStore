const expect  = require('chai').expect;
const DB = require('../lib/SimpleStore')


describe('Single domain tests', () => {
  let db;
  before( async() => {
    db = new DB('Test')
    db.clear();
  })

  it('should create a fresh domain', () => {
    expect(db.items).to.eql({})
  })

  it('should save vlaues', () => {
    db.set('string','This is a string')
    db.set('int',44)
    db.set('float',52.22)
    db.set('obj',{a:10,b:20})
    db.set('array',[1,2,3,4])

    expect(db.numItems()).to.eq(5);
    let db2 = new DB('Test')
    expect(db.get('string')).to.eq('This is a string')
    expect(db.get('int')).to.eq(44)
    expect(db.get('float')).to.eq(52.22)
    expect(db.get('array')).to.eql([1,2,3,4])
    expect(db.get('obj')).to.eql({a:10,b:20})

    expect(db.has('foo')).to.be.false;
    expect(db.get('foo')).to.be.undefined;
  })

})

