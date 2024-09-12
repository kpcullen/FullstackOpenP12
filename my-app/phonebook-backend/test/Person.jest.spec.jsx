import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Person from '../phonebook-frontend/src/components/Person'

describe('<Person />', () => {
  it("renders the person's name, number, and delete button", () => {
    const person = { id: 1, person: 'John Doe', number: '123-456-7890' }
    const handleDelete = jest.fn()

    render(<Person person={person} handleDelete={handleDelete} />)

    expect(screen.getByText('John Doe: 123-456-7890')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})
