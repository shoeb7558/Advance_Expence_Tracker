import App from "../App";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'; 

test('this test is for App', () => {
    //Arrange
    render(<App/>)

    //act
    //...nothing

    //Assert

    const AppfirstElement = screen.getByText(/Toggle/);
    expect(AppfirstElement).toBeInTheDocument();
  
})
