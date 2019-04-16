const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definition and validations', () => {
    it('has a `name`, `description`, `cost` and `imageUrl`', async () => {
      const rose = await Product.create({
        name: 'Rose',
        description: 'A dozen roses',
        cost: 25.5
      })

      expect(rose.name).to.equal('Rose')
      expect(rose.description).to.equal('A dozen roses')
      expect(rose.cost).to.equal(25.5)
    })

    it('`name` and `cost` are required', () => {
      const rose = Product.build()
      return rose.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
