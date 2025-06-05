import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import Login from './components/login';
import Calculator from './components/calculator';

describe('App Navigation', () => {
    it('test_redirect_to_login_from_root', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('test_navigate_to_calculator_after_login', () => {
        render(
            <MemoryRouter initialEntries={['/calculator']}>
                <Routes>
                    <Route path="/calculator" element={<Calculator />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/calculator/i)).toBeInTheDocument();
    });

    it('test_login_component_render', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('test_unauthorized_access_to_calculator', () => {
        render(
            <MemoryRouter initialEntries={['/calculator']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('test_invalid_route_redirect', () => {
        render(
            <MemoryRouter initialEntries={['/invalid-route']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('test_navigation_state_after_refresh', () => {
        render(
            <MemoryRouter initialEntries={['/calculator']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText(/calculator/i)).toBeInTheDocument();
    });
});