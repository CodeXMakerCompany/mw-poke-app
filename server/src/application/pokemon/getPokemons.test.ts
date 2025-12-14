jest.mock('infra/services/http_invoker');

describe('getPokemonsUseCaseV1', () => {
    let getPokemonsUseCaseV1: any;
    let mockHttpInvoker: any;

    beforeEach(() => {
        jest.resetModules(); // Reset cache
        jest.mock('infra/services/http_invoker');
        getPokemonsUseCaseV1 = require('./getPokemons').default;
        mockHttpInvoker = require('infra/services/http_invoker').default;
    });

    it('should return a list of pokemons with details', async () => {

        mockHttpInvoker.call
            .mockResolvedValueOnce({ data: { count: 2 } } as any)
            .mockResolvedValueOnce({
                data: {
                    results: [
                        { name: 'pikachu', url: 'http://pokeapi.co/api/v2/pokemon/25/' },
                        { name: 'bulbasaur', url: 'http://pokeapi.co/api/v2/pokemon/1/' },
                    ],
                },
            } as any)
            .mockResolvedValueOnce({
                data: {
                    name: 'pikachu',
                    types: [{ type: { name: 'electric' } }],
                    sprites: { front_default: 'pikachu.png' },
                },
            } as any)
            .mockResolvedValueOnce({
                data: {
                    name: 'bulbasaur',
                    types: [{ type: { name: 'grass' } }],
                    sprites: { front_default: 'bulbasaur.png' },
                },
            } as any);

        const result = await getPokemonsUseCaseV1();

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            name: 'pikachu',
            types: ['electric'],
            image: 'pikachu.png',
        });
        expect(result[1]).toEqual({
            name: 'bulbasaur',
            types: ['grass'],
            image: 'bulbasaur.png',
        });
    });

    it('should handle errors gracefully', async () => {
        mockHttpInvoker.call.mockRejectedValue(new Error('Network error'));

        await expect(getPokemonsUseCaseV1()).rejects.toThrow(
            'We cannot retrieve pokemon count atm try again later'
        );
    });
});
