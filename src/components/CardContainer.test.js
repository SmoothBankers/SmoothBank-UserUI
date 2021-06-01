import configureStore from "../store/configureStore"
import { render, screen, act, waitFor, fireEvent, cleanup } from '@testing-library/react';
import mockedAxios from 'axios';
import axios from "axios";
import CardContainer from './CardContainer';
import cardReducer from '../reducers/cardReducer';

afterEach(() =>{
    axios.get.mockClear();
    axios.post.mockClear();
    cleanup;
});

test('displaying page', async () => {
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
      render(<CardContainer store = {configureStore()}/>);
    });

    expect(screen.getByText(/Register/)).toBeInTheDocument();
    const titleElement = screen.findByText("Example title");

    await waitFor(() => {
      expect(titleElement).toBeTruthy();
    });
  
  
  });

  describe('test the reducer and actions', () =>{
    // it('should return the initial state', () =>{
    //   expect(cardReducer.cardData)
    // });

    it('should update on button press', () =>{
      render(<CardContainer store = {configureStore()}/>);
      const fireResult = fireEvent.click(screen.getByText(/Register/));
      expect(cardReducer.cardData).toBeTruthy();
      console.log(fireResult);
    });
  });