import {
  Prisma,
  PrismaClient,
  Role,
  ShiftExchangeStatus,
  ShiftType,
  WeekDay,
} from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

//!! Esse arquivo foi criado com o auxílio de IA, para popular o banco e
//!! assim auxiliar no desenvolvimento das telas e funcionalidades

async function main() {
  function hashPassword(password) {
    return hash(password, 12)
  }

  // 1. Criando dois departamentos
  await prisma.department.createMany({
    data: [
      { name: 'Tecnologia da Informação', code: 'TI-001' },
      { name: 'Enfermagem', code: 'ENF-001' },
    ],
    skipDuplicates: true,
  })

  const tiDepartment = await prisma.department.findUnique({
    where: { code: 'TI-001' },
  })
  const enfDepartment = await prisma.department.findUnique({
    where: { code: 'ENF-001' },
  })

  if (!tiDepartment || !enfDepartment) {
    throw new Error('Erro na geração de departamentos')
  }

  // 2. Criando usuários
  const adminTI = await prisma.user.create({
    data: {
      name: 'Admin TI',
      email: 'admin.ti@hospital.com',
      password: await hashPassword('admin.ti@hospital.com'),
      department_id: tiDepartment.id,
      role: Role.ADMIN,
    },
  })

  const gestores = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Gestor Enf Diurno',
        email: 'gestor.enf.diurno@hospital.com',
        password: await hashPassword('gestor.enf.diurno@hospital.com'),
        department_id: enfDepartment.id,
        role: Role.MANAGER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Gestor Enf Noturno',
        email: 'gestor.enf.noturno@hospital.com',
        password: await hashPassword('gestor.enf.noturno@hospital.com'),
        department_id: enfDepartment.id,
        role: Role.MANAGER,
      },
    }),
  ])

  const enfermeiros = await Promise.all(
    Array.from({ length: 18 }, async (_, i) => {
      const isDiurno = i < 9 // 9 diurnos, 9 noturnos
      return prisma.user.create({
        data: {
          name: `Enfermeiro ${i + 1} ${isDiurno ? 'Diurno' : 'Noturno'}`,
          email: `enf${i + 1}.${isDiurno ? 'diurno' : 'noturno'}@hospital.com`,
          password: await hashPassword(
            `enf${i + 1}.${isDiurno ? 'diurno' : 'noturno'}@hospital.com`,
          ),
          department_id: enfDepartment.id,
          role: Role.USER,
        },
      })
    }),
  )

  // Criando turnos
  const shifts = await Promise.all([
    prisma.shift.create({
      data: { department_id: tiDepartment.id, type: ShiftType.DIURNAL },
    }),
    prisma.shift.create({
      data: { department_id: enfDepartment.id, type: ShiftType.DIURNAL },
    }),
    prisma.shift.create({
      data: { department_id: enfDepartment.id, type: ShiftType.NOCTURNAL },
    }),
  ])

  const tiShift = shifts[0]
  const enfDiurnoShift = shifts[1]
  const enfNoturnoShift = shifts[2]

  // 3. Criando escalas mensais com 12x36 para março de 2025
  const schedules = await Promise.all(
    [adminTI, ...enfermeiros].map(async (user, index) => {
      const isTI = user.department_id === tiDepartment.id
      const isDiurno = index <= 9 // Admin + 9 diurnos
      const shift = isTI ? tiShift : isDiurno ? enfDiurnoShift : enfNoturnoShift

      const schedule = await prisma.schedule.create({
        data: {
          user_id: user.id,
          name: `Escala ${user.name} - Março 2025`,
          start_date: new Date('2025-03-01'),
          end_date: new Date('2025-03-31'),
        },
      })

      // Escala 12x36: trabalho dia sim, dois dias não (aproximadamente)
      const scheduleShifts: Prisma.ScheduleShiftCreateManyInput[] = []
      let date = new Date('2025-03-01')
      const weekDays = [
        WeekDay.SUNDAY,
        WeekDay.MONDAY,
        WeekDay.TUESDAY,
        WeekDay.WEDNESDAY,
        WeekDay.THURSDAY,
        WeekDay.FRIDAY,
        WeekDay.SATURDAY,
      ]

      while (date <= new Date('2025-03-31')) {
        scheduleShifts.push({
          schedule_id: schedule.id,
          shift_id: shift.id,
          day_week: weekDays[date.getDay()],
          date: new Date(date),
        })
        date.setDate(date.getDate() + 3) // 12h trabalho, 36h folga
      }

      await prisma.scheduleShift.createMany({ data: scheduleShifts })
      return schedule
    }),
  )

  // Pegando todos os ScheduleShifts para usar nas trocas
  const allScheduleShifts = await prisma.scheduleShift.findMany({
    where: { shift_id: { in: [enfDiurnoShift.id, enfNoturnoShift.id] } },
  })

  // 4. Simulando trocas de turno entre enfermeiros
  await prisma.shiftExchangeRequest.createMany({
    data: [
      {
        applicant_id: enfermeiros[0].id, // Enfermeiro 1 Diurno
        receptor_id: enfermeiros[1].id, // Enfermeiro 2 Diurno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.PENDING,
        origin_shift_id: allScheduleShifts[0].id,
        destination_id: allScheduleShifts[1].id,
        reason: 'Conflito de horário',
      },
      {
        applicant_id: enfermeiros[9].id, // Enfermeiro 1 Noturno
        receptor_id: enfermeiros[10].id, // Enfermeiro 2 Noturno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.APPROVED_RECEIVER,
        origin_shift_id: allScheduleShifts[10].id,
        destination_id: allScheduleShifts[11].id,
        reason: 'Preferência por outro dia',
      },
      {
        applicant_id: enfermeiros[2].id, // Enfermeiro 3 Diurno
        receptor_id: enfermeiros[11].id, // Enfermeiro 3 Noturno
        department_id: enfDepartment.id,
        status: ShiftExchangeStatus.APPROVED_MANAGER,
        origin_shift_id: allScheduleShifts[2].id,
        destination_id: allScheduleShifts[12].id,
        reason: 'Ajuste de escala',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
