// import React from 'react'; 
// import '@testing-library/jest-dom';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ClassForm from '../../../components/forms/ClassForm';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';

// // Mock do `useRouter`
// jest.mock('next/navigation', () => ({
//     useRouter: jest.fn(),
// }));

// // Mock do `toast`
// jest.mock('react-toastify', () => ({
//     toast: jest.fn(),
// }));

// describe('ClassForm', () => {
//     let mockPush: jest.Mock;

//     beforeEach(() => {
//         mockPush = jest.fn();
//         (useRouter as jest.Mock).mockReturnValue({
//             push: mockPush,
//             refresh: jest.fn(),
//         });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     const relatedData = {
//         teachers: [
//             { id: 'teacher-1', name: 'John', surname: 'Doe' },
//             { id: 'teacher-2', name: 'Jane', surname: 'Smith' },
//         ],
//         grades: [
//             { id: 1, level: 10 },
//             { id: 2, level: 11 },
//         ],
//     };

//     test('renders correctly', () => {
//         render(
//             <ClassForm type="create" setOpen={jest.fn()} relatedData={relatedData} />
//         );

//         // Verifica se os campos estão sendo renderizados corretamente
//         expect(screen.getByLabelText(/Class name/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Supervisor/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/Grade/i)).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
//     });

//     test('submits form successfully and shows toast', async () => {
//         const setOpenMock = jest.fn();

//         render(
//             <ClassForm
//                 type="create"
//                 setOpen={setOpenMock}
//                 relatedData={relatedData}
//             />
//         );

//         // Preenche os campos do formulário
//         fireEvent.change(screen.getByLabelText(/Class name/i), {
//             target: { value: 'Math' },
//         });
//         fireEvent.change(screen.getByLabelText(/Capacity/i), {
//             target: { value: '30' },
//         });
//         fireEvent.change(screen.getByLabelText(/Supervisor/i), {
//             target: { value: 'teacher-1' },
//         });
//         fireEvent.change(screen.getByLabelText(/Grade/i), {
//             target: { value: '1' },
//         });

//         // Submete o formulário
//         fireEvent.click(screen.getByRole('button', { name: /Create/i }));

//         // Simula a ação bem-sucedida (toast)
//         await waitFor(() => {
//             expect(toast).toHaveBeenCalledWith('Subject has been created!');
//         });

//         // Verifica se o `setOpen` foi chamado para fechar o modal
//         expect(setOpenMock).toHaveBeenCalledWith(false);
//     });

//     test('shows error message if submission fails', async () => {
//         const setOpenMock = jest.fn();

//         render(
//             <ClassForm
//                 type="create"
//                 setOpen={setOpenMock}
//                 relatedData={relatedData}
//             />
//         );

//         // Preenche os campos do formulário
//         fireEvent.change(screen.getByLabelText(/Class name/i), {
//             target: { value: 'Math' },
//         });
//         fireEvent.change(screen.getByLabelText(/Capacity/i), {
//             target: { value: '30' },
//         });
//         fireEvent.change(screen.getByLabelText(/Supervisor/i), {
//             target: { value: 'teacher-1' },
//         });
//         fireEvent.change(screen.getByLabelText(/Grade/i), {
//             target: { value: '1' },
//         });

//         // Simula o clique no botão de submissão
//         fireEvent.click(screen.getByRole('button', { name: /Create/i }));

//         // Verifica se a mensagem de erro é exibida
//         await waitFor(() => {
//             expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
//         });

//         // Certifica-se de que o modal não é fechado
//         expect(setOpenMock).not.toHaveBeenCalled();
//     });
// });
