/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { it } = require('mocha');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db');

const agent = session(app);

const breed = {
    name: 'Pug',
    min_height: 20,
    max_height: 40,
    min_weight: 6,
    max_weight: 8,
    min_life: 12,
    max_life: 15,
};

describe('Dogs routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    beforeEach(() => conn.sync({ force: true })
        .then(() => Breed.create(breed)));
    describe('GET /dogs', () => {
        it('should get 200', () =>
            agent.get('/dogs').expect(200)
        );
        it("should get a 404", () =>
            agent.get("/dogs/129213213").expect(404)
        )
        it("should get a 404", () =>
            agent.get("/dogs/?name=hfkjashdash").expect(404)
        )
        it("should get a 200", () =>
            agent.get("/temperaments"),
            agent.post('/dogs').send({
                name: 'Pug',
                max_weight: 8,
                min_weight: 6,
                max_height: 40,
                min_height: 20,
                min_life: 10,
                max_life: 12,
                tempsId: [1, 2, 3]
            }),
            agent.get("/dogs/1").expect(200)
        )
    });
    describe('POST /dogs', () => {
        it('should get 404', () =>
            agent.post('/dogs').expect(404)
        );
        it('should get 200', () =>
            agent.get("/temperaments"),
            agent.post('/dogs').send({
                name: 'Pug',
                max_weight: 8,
                min_weight: 6,
                max_height: 40,
                min_height: 20,
                min_life: 10,
                max_life: 12,
                tempsId: [1, 2, 3]
            }).expect(200)
        );
    });
});