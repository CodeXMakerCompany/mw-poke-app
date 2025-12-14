import { render, screen } from '@testing-library/react'
import PokemonList from '@/app/pages/home/pokemon_list'

describe('PokemonList', () => {
    it('renders the Pokemon List title', () => {
        const mockPokemons = [
            {
                name: 'pikachu',
                image: '/test.png',
                types: ['electric']
            }
        ]

        render(<PokemonList pokemons={mockPokemons} />)

        expect(screen.getByText('Pokemon List')).toBeInTheDocument()
    })

    it('renders pokemon items', () => {
        const mockPokemons = [
            {
                name: 'pikachu',
                image: '/test.png',
                types: ['electric']
            },
            {
                name: 'charizard',
                image: '/test2.png',
                types: ['fire', 'flying']
            }
        ]

        render(<PokemonList pokemons={mockPokemons} />)

        expect(screen.getByText('pikachu')).toBeInTheDocument()
        expect(screen.getByText('charizard')).toBeInTheDocument()
    })
})
