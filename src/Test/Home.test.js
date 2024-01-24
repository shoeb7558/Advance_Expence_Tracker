import Home from '../Home/home';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'; 
import Profile from '../Home/Profile';


describe('this the home component', () => {
    test('this test is for App', () => {
        //Arrange
        render(<Home/>)
    
        //act
        //...nothing
    
        //Assert
    
        const HomefirstElement = screen.getByText(/Welcome to the home page/, {exact : false});
        expect(HomefirstElement).toBeInTheDocument();
      
    });
    test('this test is for Profile', () => {
        //Arrange
        render(<Profile/>)
    
        //act
        //...nothing
    
        //Assert
    
        const ProfilefirstElement = screen.getByText(/Profile Photo URL:/);
        expect(ProfilefirstElement).toBeInTheDocument();
      
    });
})

