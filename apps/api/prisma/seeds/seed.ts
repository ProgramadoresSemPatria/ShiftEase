import {
  PrismaClient,
  ShiftExchangeStatus,
  ShiftType,
  UserRole,
  WeekDay,
} from '@prisma/client'

const prisma = new PrismaClient()

//!! Esse arquivo foi criado com o auxílio de IA, para popular o banco e
//!! assim auxiliar no desenvolvimento das telas e funcionalidades

async function main() {
  await prisma.role.createMany({
    data: [
      { name: UserRole.ADMIN },
      { name: UserRole.GESTOR },
      { name: UserRole.FUNCIONARIO },
    ],
    skipDuplicates: true,
  })

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
  })

  const tiDepartment = await prisma.department.findUnique({
    where: { codigo: 'TI-001' },
  })

  const utiDepartment = await prisma.department.findUnique({
    where: { codigo: 'UTI-001' },
  })

  const adminRole = await prisma.role.findUnique({
    where: { name: UserRole.ADMIN },
  })

  const gestorRole = await prisma.role.findUnique({
    where: { name: UserRole.GESTOR },
  })

  const funcionarioRole = await prisma.role.findUnique({
    where: { name: UserRole.FUNCIONARIO },
  })

  if (
    !tiDepartment ||
    !utiDepartment ||
    !adminRole ||
    !gestorRole ||
    !funcionarioRole
  ) {
    throw new Error('Error on role or department generation')
  }

  const adminTI = await prisma.user.create({
    data: {
      name: 'Admin de TI',
      email: 'admin.ti@hospital.com',
      password: 'senhaHasheada123',
      department_id: tiDepartment.id,
      role_id: adminRole.id,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Gestor UTI Diurno',
      email: 'gestor.uti.diurno@hospital.com',
      password: 'senhaHasheadaUTI1',
      department_id: utiDepartment.id,
      role_id: gestorRole.id,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Gestor UTI Noturno',
      email: 'gestor.uti.noturno@hospital.com',
      password: 'senhaHasheadaUTI2',
      department_id: utiDepartment.id,
      role_id: gestorRole.id,
    },
  })

  const funcionariosUTI = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 1',
        email: 'enfermeiro1.uti@hospital.com',
        password: 'senhaHasheadaUTI3',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 2',
        email: 'enfermeiro2.uti@hospital.com',
        password: 'senhaHasheadaUTI4',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 3',
        email: 'enfermeiro3.uti@hospital.com',
        password: 'senhaHasheadaUTI5',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 4',
        email: 'enfermeiro4.uti@hospital.com',
        password: 'senhaHasheadaUTI6',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 5',
        email: 'enfermeiro5.uti@hospital.com',
        password: 'senhaHasheadaUTI7',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Enfermeiro UTI 6',
        email: 'enfermeiro6.uti@hospital.com',
        password: 'senhaHasheadaUTI8',
        department_id: utiDepartment.id,
        role_id: funcionarioRole.id,
      },
    }),
  ])

  const tiShift = await prisma.shift.create({
    data: {
      department_id: tiDepartment.id,
      tipo: ShiftType.DIURNO,
    },
  })

  const utiDiurnoShift = await prisma.shift.create({
    data: {
      department_id: utiDepartment.id,
      tipo: ShiftType.DIURNO,
    },
  })

  const utiNoturnoShift = await prisma.shift.create({
    data: {
      department_id: utiDepartment.id,
      tipo: ShiftType.NOTURNO,
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
        dia_semana: WeekDay.SEGUNDA,
        data: new Date('2024-03-25'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.TERCA,
        data: new Date('2024-03-26'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.QUARTA,
        data: new Date('2024-03-27'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.QUINTA,
        data: new Date('2024-03-28'),
      },
      {
        schedule_id: adminSchedule.id,
        shift_id: tiShift.id,
        dia_semana: WeekDay.SEXTA,
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
        [WeekDay.SEGUNDA, WeekDay.QUARTA],
        [WeekDay.TERCA, WeekDay.QUINTA],
        [WeekDay.QUARTA, WeekDay.SEXTA],
      ]

      const selectedShift = index < 3 ? utiDiurnoShift : utiNoturnoShift
      const selectedWorkDays = workDays[index % 3]

      await prisma.scheduleShift.createMany({
        data: selectedWorkDays.map((day) => {
          const dayMap = {
            SEGUNDA: 25,
            TERCA: 26,
            QUARTA: 27,
            QUINTA: 28,
            SEXTA: 29,
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
        status: ShiftExchangeStatus.PENDENTE,
        origin_shift_id: utiDiurnoShift.id,
        destination_id: utiNoturnoShift.id,
        motivo: 'Necessidade de ajuste na escala',
      },
      {
        applicant_id: funcionariosUTI[3].id,
        receptor_id: funcionariosUTI[4].id,
        department_id: utiDepartment.id,
        status: ShiftExchangeStatus.PENDENTE,
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
