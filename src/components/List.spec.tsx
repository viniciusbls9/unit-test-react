import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import List from './List'

describe('List Component', () => {
  it('should render list items', () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)

    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Rodz')).toBeInTheDocument()
    expect(getByText('Mayk')).toBeInTheDocument()

    unmount()
    rerender(<List initialItems={['Julia']} />)

    expect(getByText('Julia')).toBeInTheDocument()
    expect(queryByText('Mayk')).not.toBeInTheDocument()

  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]} />)

    const inputElement = getByPlaceholderText('new item')
    const addButton = getByText('Add')

    userEvent.type(inputElement, 'Novo')
    userEvent.click(addButton)

    expect(await findByText('Novo')).toBeInTheDocument() 

  });

  it('should be able to remove item to the list', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<List initialItems={['Diego']} />)

    const removeButtons = getAllByText('Remove')

    userEvent.click(removeButtons[0])

    await waitForElementToBeRemoved(() => {
      return getByText('Diego')
    })

  });
})
