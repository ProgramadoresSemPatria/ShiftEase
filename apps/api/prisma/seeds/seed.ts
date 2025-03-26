import {
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

  await prisma.department.createMany({
    data: [
      {
        name: 'Tecnologia da Informação',
        codigo: 'TI-001',
      },
      {
        name: 'Unidade de Terapia Intensiva',
        codigo: 'UTI-001',
      },
    ],
    skipDuplicates: true,
  })

  const tiDepartment = await prisma.department.findUnique({
    where: { codigo: 'TI-001' },
  })
  const utiDepartment = await prisma.department.findUnique({
    where: { codigo: 'UTI-001' },
  })

  if (!tiDepartment || !utiDepartment) {
    throw new Error('Error on department generation')
  }

  const adminTI = await prisma.user.create({
    data: {
      name: 'Admin de TI',
      email: 'admin.ti@hospital.com',
      password: await hashPassword('admin.ti@hospital.com'),
      department_id: tiDepartment.id,
      role: Role.ADMIN,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Gestor UTI Diurno',
      email: 'gestor.uti.diurno@hospital.com',
      password: await hashPassword('gestor.uti.diurno@hospital.com'),
      department_id: utiDepartment.id,
      role: Role.MANAGER,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Gestor UTI Noturno',
      email: 'gestor.uti.noturno@hospital.com',
      password: await hashPassword('gestor.uti.noturno@hospital.com'),
      department_id: utiDepartment.id,
      role: Role.MANAGER,
    },
  })

  const funcionariosUTI = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 1',
        email: 'enfermeiro1.uti@hospital.com',
        password: await hashPassword('enfermeiro1.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 2',
        email: 'enfermeiro2.uti@hospital.com',
        password: await hashPassword('enfermeiro2.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 3',
        email: 'enfermeiro3.uti@hospital.com',
        password: await hashPassword('enfermeiro3.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 4',
        email: 'enfermeiro4.uti@hospital.com',
        password: await hashPassword('enfermeiro4.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 5',
        email: 'enfermeiro5.uti@hospital.com',
        password: await hashPassword('enfermeiro5.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 6',
        email: 'enfermeiro6.uti@hospital.com',
        password: await hashPassword('enfermeiro6.uti@hospital.com'),
        department_id: utiDepartment.id,
        role: Role.USER,
      },
    }),
  ])

  const tiShift = await prisma.shift.create({
    data: {
      department_id: tiDepartment.id,
      tipo: ShiftType.DIURNAL,
    },
  })

  const utiDiurnoShift = await prisma.shift.create({
    data: {
      department_id: utiDepartment.id,
      tipo: ShiftType.DIURNAL,
    },
  })

  const utiNoturnoShift = await prisma.shift.create({
    data: {
      department_id: utiDepartment.id,
      tipo: ShiftType.NOCTURNAL,
    },
  })

  const adminSchedule = await prisma.schedule.create({
    data: {
      user_id: adminTI.id,
      name: 'Escala Admin TI',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-31'),
    },
  })

  await prisma.scheduleShift.createMany({
    data: [
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.MONDAY,
        data: new Date('2024-03-25'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.TUESDAY,
        data: new Date('2024-03-26'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.WEDNESDAY,
        data: new Date('2024-03-27'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.THURSDAY,
        data: new Date('2024-03-28'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.FRIDAY,
        data: new Date('2024-03-29'),
      },
    ],
  })

  await Promise.all(
    funcionariosUTI.map(async (funcionario, index) => {
      const schedule = await prisma.schedule.create({
        data: {
          user_id: funcionario.id,
          name: `Escala UTI ${funcionario.name}`,
          start_date: new Date('2024-01-01'),
          end_date: new Date('2024-12-31'),
        },
      })

      const workDays = [
        [WeekDay.MONDAY, WeekDay.WEDNESDAY],
        [WeekDay.TUESDAY, WeekDay.THURSDAY],
        [WeekDay.WEDNESDAY, WeekDay.FRIDAY],
      ]

      const selectedShift = index < 3 ? utiDiurnoShift : utiNoturnoShift
      const selectedWorkDays = workDays[index % 3]

      await prisma.scheduleShift.createMany({
        data: selectedWorkDays.map((day) => {
          const dayMap = {
            MONDAY: 25,
            TUESDAY: 26,
            WEDNESDAY: 27,
            THURSDAY: 28,
            FRIDAY: 29,
          }

          return {
            schedule_id: schedule.id,
            shift_id: selectedShift.id,
            dia_semana: day,
            data: new Date(`2024-03-${dayMap[day]}`),
          }
        }),
      })

      return schedule
    }),
  )

  await prisma.shiftExchangeRequest.createMany({
    data: [
      {
        applicant_id: funcionariosUTI[0].id,
        receptor_id: funcionariosUTI[1].id,
        department_id: utiDepartment.id,
        status: ShiftExchangeStatus.PENDING,
        origin_shift_id: utiDiurnoShift.id,
        destination_id: utiNoturnoShift.id,
        motivo: 'Necessidade de ajuste na escala',
      },
      {
        applicant_id: funcionariosUTI[3].id,
        receptor_id: funcionariosUTI[4].id,
        department_id: utiDepartment.id,
        status: ShiftExchangeStatus.PENDING,
        origin_shift_id: utiNoturnoShift.id,
        destination_id: utiDiurnoShift.id,
        motivo: 'Compromisso pessoal',
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
