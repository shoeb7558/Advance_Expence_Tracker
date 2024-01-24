import { render, screen } from '@testing-library/react'
import Profile from './Profile'
import '@testing-library/jest-dom'; 

describe('testing async code', () => {
    test('fetch function testing', async () => {
        render(<Profile/>)

        const listitem = await screen.findAllByRole('listitems')
        expect(listitem).not.toHaveLength(0)
    })
})