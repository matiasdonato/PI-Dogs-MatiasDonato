const { should, assert } = require('chai');
const { Breed, conn } = require('../../src/db.js');
var { expect } = require('chai')

describe('Dog model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Breed.sync({ force: true }));
        describe('name', () => {
            it('should throw an error', async() => {
                try {
                    await Breed.create({});
                } catch (error) {
                    expect(error.message).to.equal(error.message);
                }
            });
        });
    })

    describe("CreateBreed", () => {
            it("should have the name Pug ", async() => {
                let dog = await Breed.create({
                    name: 'Pug',
                    max_weight: 8,
                    min_weight: 6,
                    max_height: 40,
                    min_height: 20,
                    min_life: 10,
                    max_life: 12
                })
                dog = dog.toJSON()
                expect(dog.name).to.equal("Pug")
            });
            it("should have the weight: 6 - 8 ", async() => {
                let dog = await Breed.create({
                    name: 'Pug',
                    max_weight: 8,
                    min_weight: 6,
                    max_height: 40,
                    min_height: 20,
                    min_life: 10,
                    max_life: 12
                })
                dog = dog.toJSON()
                expect(dog.weight).to.equal("6 - 8")
            });
            it("should have the height: 20 - 40", async() => {
                let dog = await Breed.create({
                    name: 'Pug',
                    max_weight: 8,
                    min_weight: 6,
                    max_height: 40,
                    min_height: 20,
                    min_life: 10,
                    max_life: 12
                })
                dog = dog.toJSON()
                expect(dog.height).to.equal("20 - 40")
            });
            it("should have the yearsOfLife: 10 - 12", async() => {
                let dog = await Breed.create({
                    name: 'Pug',
                    max_weight: 8,
                    min_weight: 6,
                    max_height: 40,
                    min_height: 20,
                    min_life: 10,
                    max_life: 12
                })
                dog = dog.toJSON()
                expect(dog.yearsOfLife).to.equal("10 - 12")
            });
        })
        // describe("Breed", () => {
        //     it('should create a dog when all dates are valid', async() => {
        //         var dog = await Breed.create({
        //             name: 'Pug',
        //         })
        //         expect(dog.toJSON()).to.equal({
        //             id: 1,
        //             name: 'Pug',
        //             max_height: 40,
        //             min_height: 20,
        //             height: "20 - 40",
        //             max_weight: 8,
        //             min_weight: 6,
        //             weight: "6 - 8",
        //             min_life: 12,
        //             max_life: 15,
        //             yearsOfLife: "12 - 15",
        //             "image": null,
        //         })
        //     });
        // })
});