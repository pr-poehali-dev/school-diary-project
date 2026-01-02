import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const studentData = {
    name: 'Иванов Иван',
    class: '9А',
    avgGrade: 4.3,
    attendance: 92,
  };

  const grades = [
    { subject: 'Математика', grades: [5, 4, 5, 5, 4], avg: 4.6 },
    { subject: 'Русский язык', grades: [4, 4, 5, 4, 4], avg: 4.2 },
    { subject: 'Физика', grades: [5, 5, 4, 5, 5], avg: 4.8 },
    { subject: 'История', grades: [4, 3, 4, 4, 5], avg: 4.0 },
    { subject: 'Английский', grades: [5, 5, 5, 4, 5], avg: 4.8 },
  ];

  const homework = [
    { subject: 'Математика', task: 'Решить задачи №125-130', deadline: '2026-01-05', status: 'pending' },
    { subject: 'Русский язык', task: 'Написать сочинение', deadline: '2026-01-06', status: 'pending' },
    { subject: 'Физика', task: 'Лабораторная работа №3', deadline: '2026-01-03', status: 'completed' },
    { subject: 'История', task: 'Прочитать параграф 12', deadline: '2026-01-04', status: 'overdue' },
  ];

  const schedule = [
    { day: 'Понедельник', lessons: ['Математика', 'Русский язык', 'Физика', 'История', 'Английский'] },
    { day: 'Вторник', lessons: ['Физика', 'Математика', 'География', 'Литература', 'Химия'] },
    { day: 'Среда', lessons: ['Английский', 'Биология', 'История', 'Математика', 'Физкультура'] },
  ];

  const announcements = [
    { title: 'Родительское собрание', date: '2026-01-10', text: 'Приглашаем на общее родительское собрание в 18:00' },
    { title: 'Каникулы', date: '2026-01-20', text: 'Зимние каникулы с 20 по 31 января' },
    { title: 'Олимпиада по математике', date: '2026-01-15', text: 'Школьный этап олимпиады' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-white';
      case 'overdue': return 'bg-destructive text-white';
      default: return 'bg-warning text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Выполнено';
      case 'overdue': return 'Просрочено';
      default: return 'В работе';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Электронный журнал
            </h1>
            <Badge className="text-lg px-4 py-2" variant="outline">
              {studentData.class}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">{studentData.name}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="LayoutDashboard" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Д/З</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Icon name="Calendar" size={18} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Icon name="UserCheck" size={18} />
              <span className="hidden sm:inline">Посещаемость</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Icon name="Megaphone" size={18} />
              <span className="hidden sm:inline">Объявления</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Средний балл
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{studentData.avgGrade}</div>
                  <p className="text-xs text-white/80 mt-2">За последний месяц</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="UserCheck" size={20} />
                    Посещаемость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{studentData.attendance}%</div>
                  <Progress value={studentData.attendance} className="mt-3 bg-white/30" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent to-accent/80 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="BookOpen" size={20} />
                    Домашние задания
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{homework.filter(h => h.status === 'pending').length}</div>
                  <p className="text-xs text-white/80 mt-2">Активных заданий</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-success to-success/80 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Award" size={20} />
                    Отличных оценок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {grades.reduce((acc, g) => acc + g.grades.filter(grade => grade === 5).length, 0)}
                  </div>
                  <p className="text-xs text-white/80 mt-2">За последний месяц</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} className="text-primary" />
                    Успеваемость по предметам
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {grades.map((subject, index) => (
                    <div key={index} className="space-y-2 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.subject}</span>
                        <span className="font-bold text-primary">{subject.avg}</span>
                      </div>
                      <Progress value={subject.avg * 20} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Megaphone" size={24} className="text-secondary" />
                    Последние объявления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {announcements.slice(0, 3).map((announcement, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-start gap-3">
                        <Icon name="Bell" size={20} className="text-accent mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{announcement.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{announcement.text}</p>
                          <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grades" className="animate-scale-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Trophy" size={28} className="text-primary" />
                  Журнал оценок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {grades.map((subject, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{subject.subject}</h3>
                          <div className="flex gap-2 flex-wrap">
                            {subject.grades.map((grade, gradeIndex) => (
                              <Badge 
                                key={gradeIndex} 
                                className={`text-lg px-3 py-1 ${
                                  grade === 5 ? 'bg-success' : 
                                  grade === 4 ? 'bg-info' : 
                                  grade === 3 ? 'bg-warning' : 'bg-destructive'
                                } text-white`}
                              >
                                {grade}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">{subject.avg}</div>
                          <div className="text-sm text-muted-foreground">Средний балл</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="animate-scale-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="BookOpen" size={28} className="text-secondary" />
                  Домашние задания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homework.map((hw, index) => (
                    <div 
                      key={index} 
                      className="p-4 border rounded-xl hover:shadow-md transition-shadow bg-white animate-fade-in"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="Book" size={18} className="text-primary" />
                            <h3 className="font-semibold">{hw.subject}</h3>
                          </div>
                          <p className="text-muted-foreground">{hw.task}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} />
                            <span>Срок сдачи: {hw.deadline}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(hw.status)}>
                          {getStatusText(hw.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="animate-scale-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Calendar" size={28} className="text-accent" />
                  Расписание уроков
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {schedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="animate-slide-up" style={{ animationDelay: `${dayIndex * 100}ms` }}>
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="CalendarDays" size={20} className="text-primary" />
                        {day.day}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {day.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex} 
                            className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
                          >
                            <div className="text-xs text-muted-foreground mb-1">{lessonIndex + 1} урок</div>
                            <div className="font-medium">{lesson}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="animate-scale-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="UserCheck" size={28} className="text-success" />
                  Посещаемость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-success/10 rounded-xl border border-success/30">
                      <div className="text-4xl font-bold text-success mb-2">45</div>
                      <div className="text-muted-foreground">Присутствовал</div>
                    </div>
                    <div className="p-6 bg-warning/10 rounded-xl border border-warning/30">
                      <div className="text-4xl font-bold text-warning mb-2">3</div>
                      <div className="text-muted-foreground">Опоздал</div>
                    </div>
                    <div className="p-6 bg-destructive/10 rounded-xl border border-destructive/30">
                      <div className="text-4xl font-bold text-destructive mb-2">1</div>
                      <div className="text-muted-foreground">Отсутствовал</div>
                    </div>
                  </div>

                  <div className="p-6 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="BarChart3" size={20} className="text-primary" />
                      Статистика по предметам
                    </h4>
                    <div className="space-y-4">
                      {grades.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{subject.subject}</span>
                            <span className="text-success font-semibold">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="animate-scale-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Megaphone" size={28} className="text-accent" />
                  Объявления
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div 
                      key={index} 
                      className="p-6 bg-gradient-to-r from-accent/10 to-transparent rounded-xl border border-accent/20 hover:border-accent/40 transition-all hover:shadow-md animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/20 rounded-lg">
                          <Icon name="Bell" size={24} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2">{announcement.title}</h3>
                          <p className="text-muted-foreground mb-3">{announcement.text}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} />
                            <span>{announcement.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
