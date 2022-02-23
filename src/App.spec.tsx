import { render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<App />)

    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Rodz')).toBeInTheDocument()
    expect(getByText('Mayk')).toBeInTheDocument() 
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<App />)

    const inputElement = getByPlaceholderText('new item')
    const addButton = getByText('Add')

    userEvent.type(inputElement, 'Novo')
    userEvent.click(addButton)

    expect(await findByText('Novo')).toBeInTheDocument() 

  });

  it('should be able to remove item to the list', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<App />)

    const removeButtons = getAllByText('Remove')

    userEvent.click(removeButtons[0])

    await waitForElementToBeRemoved(() => {
      return getByText('Diego')
    })

  });
})
