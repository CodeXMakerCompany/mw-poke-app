import request from 'supertest';
import express from 'express';
import getRoutes from './index';

jest.mock('@domain/repositories/pokemonRepository', () => {
    return jest.fn().mockImplementation(() => ({
        getPokemons: jest.fn().mockResolvedValue([
            { name: 'pikachu', types: ['electric'], image: 'pikachu.png' }
        ]),
    }));
});

jest.mock('infra/middlewares/auth', () => {
    return (req: any, res: any, next: any) => next();
});

describe('GET /pokemons', () => {
    let app: express.Express;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        getRoutes(app);
    });

    it('should return 200 and a list of pokemons', async () => {
        const response = await request(app).get('/pokemons');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { name: 'pikachu', types: ['electric'], image: 'pikachu.png' }
        ]);
    });
});
