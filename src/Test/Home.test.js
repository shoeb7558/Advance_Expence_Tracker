import Home from '../Home/home';
import { render, screen, waitFor  } from '@testing-library/react'
import '@testing-library/jest-dom'; 
import Profile from '../Home/Profile';
import { Provider } from 'react-redux';
import store from 'path/to/your/store';
import userEvent from '@testing-library/user-event'


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
    test('renders logout button and logs out on click',async  () => {
        // Arrange
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        // Act
        const logoutButton = screen.getByText('LogOut');
        userEvent.click(logoutButton);

        // Assert
        await waitFor(() => {
            const loginButton = screen.getByText('LogIn');
            expect(loginButton).toBeInTheDocument();
        });
    });
})

