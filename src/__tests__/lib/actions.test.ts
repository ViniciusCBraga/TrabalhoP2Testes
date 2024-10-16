import { createSubject, updateSubject, deleteSubject, createClass, updateClass, deleteClass, createTeacher, updateTeacher, deleteTeacher } from '../../lib/actions';
import prisma from '../../lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

// Mock do prisma e clerkClient
jest.mock('../../lib/prisma', () => ({
  subject: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  class: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  teacher: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('@clerk/nextjs/server', () => ({
  clerkClient: {
    users: {
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    },
  },
}));

describe('Subject Actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSubject', () => {
    it('should create a subject successfully', async () => {
      const currentState = { success: false, error: false };
      const data = { name: 'Math', teachers: ['teacher-1', 'teacher-2'] };

      (prisma.subject.create as jest.Mock).mockResolvedValueOnce({});

      const result = await createSubject(currentState, data);

      expect(prisma.subject.create).toHaveBeenCalledWith({
        data: {
          name: data.name,
          teachers: {
            connect: data.teachers.map((teacherId) => ({ id: teacherId })),
          },
        },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if subject creation fails', async () => {
      const currentState = { success: false, error: false };
      const data = { name: 'Math', teachers: ['teacher-1', 'teacher-2'] };

      (prisma.subject.create as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await createSubject(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });
  });

  describe('updateSubject', () => {
    it('should update a subject successfully', async () => {
      const currentState = { success: false, error: false };
      const data = { id: 1, name: 'Math', teachers: ['teacher-1', 'teacher-2'] };

      (prisma.subject.update as jest.Mock).mockResolvedValueOnce({});

      const result = await updateSubject(currentState, data);

      expect(prisma.subject.update).toHaveBeenCalledWith({
        where: { id: data.id },
        data: {
          name: data.name,
          teachers: {
            set: data.teachers.map((teacherId) => ({ id: teacherId })),
          },
        },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if subject update fails', async () => {
      const currentState = { success: false, error: false };
      const data = { id: 1, name: 'Math', teachers: ['teacher-1', 'teacher-2'] };

      (prisma.subject.update as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await updateSubject(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });
  });

  describe('deleteSubject', () => {
    it('should delete a subject successfully', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', '1');

      (prisma.subject.delete as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteSubject(currentState, formData);

      expect(prisma.subject.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if subject deletion fails', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', '1');

      (prisma.subject.delete as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await deleteSubject(currentState, formData);

      expect(result).toEqual({ success: false, error: true });
    });
  });
});

describe('Actions for Class and Teacher', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Class Actions', () => {
    it('should create a class successfully', async () => {
      const currentState = { success: false, error: false };
      const data = { name: 'Class A', capacity: 30, supervisorId: 'teacher-1', gradeId: 1 };

      (prisma.class.create as jest.Mock).mockResolvedValueOnce({});

      const result = await createClass(currentState, data);

      expect(prisma.class.create).toHaveBeenCalledWith({
        data,
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if class creation fails', async () => {
      const currentState = { success: false, error: false };
      const data = { name: 'Class A', capacity: 30, supervisorId: 'teacher-1', gradeId: 1 };

      (prisma.class.create as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await createClass(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });

    it('should update a class successfully', async () => {
      const currentState = { success: false, error: false };
      const data = { id: 1, name: 'Class B', capacity: 25, supervisorId: 'teacher-2', gradeId: 2 };

      (prisma.class.update as jest.Mock).mockResolvedValueOnce({});

      const result = await updateClass(currentState, data);

      expect(prisma.class.update).toHaveBeenCalledWith({
        where: { id: data.id },
        data,
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if class update fails', async () => {
      const currentState = { success: false, error: false };
      const data = { id: 1, name: 'Class B', capacity: 25, supervisorId: 'teacher-2', gradeId: 2 };

      (prisma.class.update as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await updateClass(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });

    it('should delete a class successfully', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', '1');

      (prisma.class.delete as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteClass(currentState, formData);

      expect(prisma.class.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if class deletion fails', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', '1');

      (prisma.class.delete as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await deleteClass(currentState, formData);

      expect(result).toEqual({ success: false, error: true });
    });
  });

  describe('Teacher Actions', () => {
    it('should create a teacher successfully', async () => {
      const currentState = { success: false, error: false };
      const data = {
        username: 'teacher1',
        password: 'password123',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main St',
        bloodType: 'O+',
        birthday: new Date('1980-01-01'),
        sex: 'MALE' as 'MALE',
        subjects: ['1'],
        phone: '555-1234',
        img: undefined,
      };

      (clerkClient.users.createUser as jest.Mock).mockResolvedValueOnce({ id: 'clerk-user-id' });
      (prisma.teacher.create as jest.Mock).mockResolvedValueOnce({});

      const result = await createTeacher(currentState, data);

      expect(clerkClient.users.createUser).toHaveBeenCalledWith({
        username: data.username,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        publicMetadata: { role: 'teacher' },
      });
      expect(prisma.teacher.create).toHaveBeenCalledWith({
        data: {
          id: 'clerk-user-id',
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email,
          address: data.address,
          bloodType: data.bloodType,
          birthday: data.birthday,
          sex: data.sex,
          phone: data.phone,
          img: data.img,
          subjects: {
            connect: [{ id: parseInt(data.subjects[0]) }],
          },
        },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if teacher creation fails', async () => {
      const currentState = { success: false, error: false };
      const data = {
        username: 'teacher1',
        password: 'password123',
        name: 'John',
        surname: 'Doe',
        address: '123 Main St',
        bloodType: 'O+',
        birthday: new Date('1980-01-01'),
        sex: 'MALE' as 'MALE',
        email: 'john.doe@example.com',
        phone: '555-1234',
        img: undefined,
        subjects: ['1'],
      };

      (clerkClient.users.createUser as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await createTeacher(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });

    it('should update a teacher successfully', async () => {
        const currentState = { success: false, error: false };
        const data = {
          id: 'clerk-user-id',
          username: 'teacher1',
          name: 'John',
          surname: 'Doe',
          address: '123 Main St',
          bloodType: 'O+',
          birthday: new Date('1980-01-01'),
          sex: 'MALE' as 'MALE',
          subjects: ['1'],
          email: 'john.doe@example.com',
          phone: '555-1234',
          img: undefined,  // Definido explicitamente como null
          password: undefined,  // Definido explicitamente como undefined (não será atualizado)
        };
      
        (clerkClient.users.updateUser as jest.Mock).mockResolvedValueOnce({});
        (prisma.teacher.update as jest.Mock).mockResolvedValueOnce({});
      
        const result = await updateTeacher(currentState, data);
      
        expect(clerkClient.users.updateUser).toHaveBeenCalledWith('clerk-user-id', {
          username: data.username,
          firstName: data.name,
          lastName: data.surname,
        });
      
        expect(prisma.teacher.update).toHaveBeenCalledWith({
          where: { id: data.id },
          data: {
            username: data.username,
            name: data.name,
            surname: data.surname,
            address: data.address,
            bloodType: data.bloodType,
            birthday: data.birthday,
            sex: data.sex,
            email: data.email,
            phone: data.phone,
            img: data.img,  // Confirmação de que o campo img está sendo enviado como null
            subjects: {
              set: [{ id: parseInt(data.subjects[0]) }],
            },
          },
        });
      
        expect(result).toEqual({ success: true, error: false });
      });
      

    it('should return an error if teacher update fails', async () => {
      const currentState = { success: false, error: false };
      const data = {
        id: 'clerk-user-id',
        username: 'teacher1',
        name: 'John',
        surname: 'Doe',
        address: '123 Main St',
        bloodType: 'O+',
        birthday: new Date('1980-01-01'),
        sex: 'MALE' as 'MALE',
        subjects: ['1'],
        email: 'john.doe@example.com',
        phone: '555-1234',
        img: undefined,
      };

      (clerkClient.users.updateUser as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await updateTeacher(currentState, data);

      expect(result).toEqual({ success: false, error: true });
    });

    it('should delete a teacher successfully', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', 'clerk-user-id');

      (clerkClient.users.deleteUser as jest.Mock).mockResolvedValueOnce({});
      (prisma.teacher.delete as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteTeacher(currentState, formData);

      expect(clerkClient.users.deleteUser).toHaveBeenCalledWith('clerk-user-id');
      expect(prisma.teacher.delete).toHaveBeenCalledWith({
        where: { id: 'clerk-user-id' },
      });
      expect(result).toEqual({ success: true, error: false });
    });

    it('should return an error if teacher deletion fails', async () => {
      const currentState = { success: false, error: false };
      const formData = new FormData();
      formData.set('id', 'clerk-user-id');

      (clerkClient.users.deleteUser as jest.Mock).mockRejectedValueOnce(new Error('Error'));

      const result = await deleteTeacher(currentState, formData);

      expect(result).toEqual({ success: false, error: true });
    });
  });
});
