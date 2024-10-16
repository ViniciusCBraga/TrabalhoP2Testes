import { ITEM_PER_PAGE, APP_NAME, DEFAULT_USER_ROLE, SUPPORTED_LANGUAGES, routeAccessMap } from '../../lib/settings';

describe('Settings', () => {
  test('ITEM_PER_PAGE should be 10', () => {
    expect(ITEM_PER_PAGE).toBe(10);
  });

  test('APP_NAME should be Sistema Escolar VB', () => {
    expect(APP_NAME).toBe("Sistema Escolar VB");
  });

  test('DEFAULT_USER_ROLE should be student', () => {
    expect(DEFAULT_USER_ROLE).toBe("student");
  });

  test('SUPPORTED_LANGUAGES should include English, Portuguese, and Spanish', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["en", "pt", "es"]);
  });
});

describe('routeAccessMap', () => {
  test('Admin should have access to all admin routes', () => {
    const adminRoutes = Object.keys(routeAccessMap).filter(route => 
      routeAccessMap[route].includes('admin')
    );
    
    expect(adminRoutes).toEqual(
      expect.arrayContaining([
        '/admin(.*)',
        '/list/teachers',
        '/list/students',
        '/list/parents',
        '/list/subjects',
        '/list/classes',
        '/list/exams',
        '/list/assignments',
        '/list/results',
        '/list/attendance',
        '/list/events',
        '/list/announcements',
      ])
    );
  });

  test('Student should only have access to certain routes', () => {
    const studentRoutes = Object.keys(routeAccessMap).filter(route => 
      routeAccessMap[route].includes('student')
    );

    expect(studentRoutes).toEqual(
      expect.arrayContaining([
        '/student(.*)',
        '/list/exams',
        '/list/assignments',
        '/list/results',
        '/list/attendance',
        '/list/events',
        '/list/announcements',
      ])
    );
  });

  test('Teacher should have access to teacher-specific routes', () => {
    const teacherRoutes = Object.keys(routeAccessMap).filter(route => 
      routeAccessMap[route].includes('teacher')
    );

    expect(teacherRoutes).toEqual(
      expect.arrayContaining([
        '/teacher(.*)',
        '/list/teachers',
        '/list/students',
        '/list/parents',
        '/list/classes',
        '/list/exams',
        '/list/assignments',
        '/list/results',
        '/list/attendance',
        '/list/events',
        '/list/announcements',
      ])
    );
  });

  test('Parent should only have access to parent and common routes', () => {
    const parentRoutes = Object.keys(routeAccessMap).filter(route => 
      routeAccessMap[route].includes('parent')
    );

    expect(parentRoutes).toEqual(
      expect.arrayContaining([
        '/parent(.*)',
        '/list/exams',
        '/list/assignments',
        '/list/results',
        '/list/attendance',
        '/list/events',
        '/list/announcements',
      ])
    );
  });

  test('Routes should not have access for invalid roles', () => {
    Object.keys(routeAccessMap).forEach(route => {
      expect(routeAccessMap[route]).not.toContain('invalidRole');
    });
  });
});
