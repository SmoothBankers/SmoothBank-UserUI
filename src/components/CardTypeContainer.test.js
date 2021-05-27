import CardTypeContainer from './CardTypeContainer'
import configureStore from "../store/configureStore"
import { render, screen, act, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';
import axios from 'axios';

  afterEach(() =>{
    axios.get.mockClear();
  });

test('mocking axios get', async () => {
  const data = {
    data: [
      {
        id: 1,
        title: "Example title",
        description: "This is a mock description",
        rate: 1.00
      }
    ]
  };

  mockedAxios.get.mockResolvedValueOnce(data);
  act(() => {
    render(<CardTypeContainer store = {configureStore()}/>);
  });
  const titleElement = screen.findByText("Example title");
  await waitFor(() => {
    expect(titleElement).toBeTruthy();
  });


});
