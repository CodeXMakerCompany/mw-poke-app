import { render, screen } from '@testing-library/react'
import PokemonListItem from '@/app/pages/home/pokemon_item'

describe('PokemonListItem', () => {

    const mockedPokemon = {
        id: 1,
        name: 'pikachu',
        image: '/test.png',
        types: ['electric']
    }

    it('renders the Pokemon attributes properly', () => {
        render(<PokemonListItem {...mockedPokemon} />)

        expect(screen.getByText('pikachu')).toBeInTheDocument()

        expect(screen.getByText('electric')).toBeInTheDocument()
    })

    it('renders the Pokemon image properly', () => {
        render(<PokemonListItem {...mockedPokemon} />)

        expect(screen.getByTestId(`test-poke-img-${mockedPokemon.id}`)).toBeInTheDocument()
    })
})
