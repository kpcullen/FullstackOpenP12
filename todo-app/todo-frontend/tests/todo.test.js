import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../src/Todos/Todo'
import React from 'react'

test('renders and handles clicks correctly', () => {
  const todo = { text: 'Test Todo', done: false }
  const onClickComplete = jest.fn()
  const onClickDelete = jest.fn()

  // Render the component
  render(
    <Todo
      todo={todo}
      onClickComplete={onClickComplete}
      onClickDelete={onClickDelete}
    />
  )

  // Check if the text and buttons are rendered
  expect(screen.getByText('Test Todo')).toBeInTheDocument()
  expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  expect(screen.getByText('Set as done')).toBeInTheDocument()
  expect(screen.getByText('Delete')).toBeInTheDocument()

  // Simulate button clicks
  fireEvent.click(screen.getByText('Set as done'))
  expect(onClickComplete).toHaveBeenCalledWith(todo)

  fireEvent.click(screen.getByText('Delete'))
  expect(onClickDelete).toHaveBeenCalledWith(todo)
})
