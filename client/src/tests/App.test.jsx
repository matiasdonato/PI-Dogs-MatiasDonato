import { render} from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import App from '../App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Nav from "../components/Nav.jsx"
import LandPage from "../components/LandPage.jsx"
import Home from '../components/Home.jsx';
import { Provider } from 'react-redux';
import store, {persistor} from '../redux/store/store.js';
import { PersistGate } from "redux-persist/lib/integration/react";
import Footer from '../components/Footer.jsx';

jest.mock("../components/CreateDog.jsx", () => jest.fn());

it('Should render App without crashing', () => {
    const div = document.createElement('div');
  
    ReactDom.render(
    <Provider store={store}>    
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>, 
    div);
  
    ReactDom.unmountComponentAtNode(div);
  });

describe("LandPage test", () => {
    it('Test 1, should get h2', () => {
        const { container } = render(   
        <Provider store={store}>    
                <BrowserRouter>
                    <LandPage />
                </BrowserRouter>
        </Provider>   );
        let element = container.querySelectorAll('h2')[0]
        expect(element.innerHTML).toBe('Dogs App');
    });
    it('Test 2, Should get the entire button', () => {
        const { container } = render(     
            <Provider store={store}>    
                <BrowserRouter>
                    <LandPage />
                </BrowserRouter>
            </Provider> );
        let element = container.getElementsByClassName('button')[0]
        expect(element.innerHTML).toBe('<h2>Dogs App</h2>');
    });
})

describe("Nav should get links", () => {
    it('Test 1, should get Links', () => {
        const { container } = render(     
            <Provider store={store}>    
                <BrowserRouter>
                    <Nav />
                </BrowserRouter>
            </Provider>  );
        let element = container.getElementsByClassName('navTitle')[0]
        expect(element.innerHTML).toBe('Dog App');
    });
    it('Test 2, should get Links', () => {
        const { container } = render(     
            <Provider store={store}>    
                <BrowserRouter>
                    <Nav />
                </BrowserRouter>
            </Provider>  );
        let element = container.getElementsByClassName('createDogLink')[0]
        expect(element.innerHTML).toBe('<h2>Create Dog</h2>');
    });
})

describe("Home", () => {
    it('Test 1, should get the "Open Filters" button', () => {
        const { container } = render(   
            <Provider store={store}>    
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>   );
        let element = container.getElementsByClassName('seeFiltersButton')[0]
        expect(element.innerHTML).toBe('Open Filters');
    });
    it('Test 2, should get the "Search" button', () => {
        const { container } = render(   
            <Provider store={store}> 
                <BrowserRouter>
                        <Home />
                </BrowserRouter>
            </Provider>  );
        let element = container.getElementsByClassName('searchButton')[0]
        expect(element.value).toBe("Search");
    });
})

describe("Footer", () => {
    it('Test 1, should get the footer content', () => {
        const { container } = render(   
            <Provider store={store}>    
                <BrowserRouter>
                    <Footer />
                </BrowserRouter>
            </Provider>   );
        let element = container.getElementsByClassName('footerContainer')[0]
        expect(element.innerHTML).toBe('<p>Dogs App by © Matias Donato</p>');
    });
})





