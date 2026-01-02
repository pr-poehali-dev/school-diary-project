-- Создание таблиц для электронного журнала

-- Таблица учеников
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица предметов
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица оценок
CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    subject_id INTEGER REFERENCES subjects(id),
    grade INTEGER NOT NULL CHECK (grade >= 2 AND grade <= 5),
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица домашних заданий
CREATE TABLE IF NOT EXISTS homework (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id),
    task TEXT NOT NULL,
    deadline DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица статусов выполнения домашних заданий
CREATE TABLE IF NOT EXISTS homework_status (
    id SERIAL PRIMARY KEY,
    homework_id INTEGER REFERENCES homework(id),
    student_id INTEGER REFERENCES students(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(homework_id, student_id)
);

-- Таблица расписания
CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 1 AND day_of_week <= 7),
    lesson_number INTEGER NOT NULL CHECK (lesson_number >= 1 AND lesson_number <= 8),
    subject_id INTEGER REFERENCES subjects(id),
    class VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(day_of_week, lesson_number, class)
);

-- Таблица посещаемости
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    subject_id INTEGER REFERENCES subjects(id),
    date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id, date)
);

-- Таблица объявлений
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестовых данных

-- Ученик
INSERT INTO students (name, class) VALUES ('Иванов Иван', '9А');

-- Предметы
INSERT INTO subjects (name) VALUES 
    ('Математика'),
    ('Русский язык'),
    ('Физика'),
    ('История'),
    ('Английский'),
    ('География'),
    ('Литература'),
    ('Химия'),
    ('Биология'),
    ('Физкультура')
ON CONFLICT (name) DO NOTHING;

-- Оценки
INSERT INTO grades (student_id, subject_id, grade, date) VALUES
    (1, 1, 5, '2025-12-15'),
    (1, 1, 4, '2025-12-20'),
    (1, 1, 5, '2025-12-25'),
    (1, 1, 5, '2026-01-01'),
    (1, 1, 4, '2026-01-02'),
    (1, 2, 4, '2025-12-16'),
    (1, 2, 4, '2025-12-21'),
    (1, 2, 5, '2025-12-26'),
    (1, 2, 4, '2026-01-01'),
    (1, 2, 4, '2026-01-02'),
    (1, 3, 5, '2025-12-17'),
    (1, 3, 5, '2025-12-22'),
    (1, 3, 4, '2025-12-27'),
    (1, 3, 5, '2026-01-01'),
    (1, 3, 5, '2026-01-02'),
    (1, 4, 4, '2025-12-18'),
    (1, 4, 3, '2025-12-23'),
    (1, 4, 4, '2025-12-28'),
    (1, 4, 4, '2026-01-01'),
    (1, 4, 5, '2026-01-02'),
    (1, 5, 5, '2025-12-19'),
    (1, 5, 5, '2025-12-24'),
    (1, 5, 5, '2025-12-29'),
    (1, 5, 4, '2026-01-01'),
    (1, 5, 5, '2026-01-02');

-- Домашние задания
INSERT INTO homework (subject_id, task, deadline) VALUES
    (1, 'Решить задачи №125-130', '2026-01-05'),
    (2, 'Написать сочинение', '2026-01-06'),
    (3, 'Лабораторная работа №3', '2026-01-03'),
    (4, 'Прочитать параграф 12', '2026-01-04');

-- Статусы домашних заданий
INSERT INTO homework_status (homework_id, student_id, status) VALUES
    (1, 1, 'pending'),
    (2, 1, 'pending'),
    (3, 1, 'completed'),
    (4, 1, 'overdue')
ON CONFLICT (homework_id, student_id) DO NOTHING;

-- Расписание для 9А класса (понедельник = 1, вторник = 2, среда = 3)
INSERT INTO schedule (day_of_week, lesson_number, subject_id, class) VALUES
    (1, 1, 1, '9А'),
    (1, 2, 2, '9А'),
    (1, 3, 3, '9А'),
    (1, 4, 4, '9А'),
    (1, 5, 5, '9А'),
    (2, 1, 3, '9А'),
    (2, 2, 1, '9А'),
    (2, 3, 6, '9А'),
    (2, 4, 7, '9А'),
    (2, 5, 8, '9А'),
    (3, 1, 5, '9А'),
    (3, 2, 9, '9А'),
    (3, 3, 4, '9А'),
    (3, 4, 1, '9А'),
    (3, 5, 10, '9А')
ON CONFLICT (day_of_week, lesson_number, class) DO NOTHING;

-- Посещаемость
INSERT INTO attendance (student_id, subject_id, date, status) VALUES
    (1, 1, '2025-12-15', 'present'),
    (1, 1, '2025-12-20', 'present'),
    (1, 2, '2025-12-16', 'present'),
    (1, 3, '2025-12-17', 'late'),
    (1, 4, '2025-12-18', 'absent'),
    (1, 5, '2025-12-19', 'present')
ON CONFLICT (student_id, subject_id, date) DO NOTHING;

-- Объявления
INSERT INTO announcements (title, text, date) VALUES
    ('Родительское собрание', 'Приглашаем на общее родительское собрание в 18:00', '2026-01-10'),
    ('Каникулы', 'Зимние каникулы с 20 по 31 января', '2026-01-20'),
    ('Олимпиада по математике', 'Школьный этап олимпиады', '2026-01-15');